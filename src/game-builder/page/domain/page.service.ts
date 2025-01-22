import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PageDomainEntity } from './entities/page.entity';
import { CreatePageReqDto } from '../application/controllers/dto/create-page.dto';
import { IPageRepository } from './ports/output/repositories/page.repository.interface';
import { Prisma } from '@prisma/client';
import { IPageService } from './ports/input/page.service.interface';
import { CreatePageDomainEntity } from './entities/create-page.entity';
import { IChatGPTPagePort } from './ports/output/chatgpt/chatgpt.interface';
import { UpdatePageReqDto } from '../application/controllers/dto/update-page.dto';
import { IChoiceRepository } from '@@src/game-builder/choice/domain/port/output/repositories/choice.repository.interface';
import { IPageImageRepository } from './ports/output/repositories/page-image.repository.interface';

@Injectable()
export class PageService implements IPageService {
  constructor(
    @Inject('IPageRepository') private readonly pageRepository: IPageRepository,
    @Inject('IChoicePageRepository')
    private readonly choicePageRepository: IChoiceRepository,
    @Inject('IPageImageRepository')
    private readonly pageImageRepository: IPageImageRepository,
  ) {}

  async getAllByGameId(gameId: number, transaction?: Prisma.TransactionClient) {
    return await this.pageRepository.getAllByGameId(gameId, transaction);
  }

  async getOneById(id: number, transaction?: Prisma.TransactionClient) {
    const pageEntity = await this.pageRepository.getOneById(id, transaction);
    if (!pageEntity) {
      throw new NotFoundException('Page not found');
    }
    if (pageEntity.backgroundImageId) {
      const backgroundImage = await this.pageImageRepository.getOneByIdOrThrow(
        pageEntity.backgroundImageId,
      );
      pageEntity.setBackgroundImage(backgroundImage);
    }
    return pageEntity;
  }

  async getStartingPage(
    gameId: number,
    transaction?: Prisma.TransactionClient,
  ) {
    return await this.pageRepository.getStartingPage(gameId, transaction);
  }

  async create(
    gameId: number,
    isStarting: boolean,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity> {
    const page = new CreatePageDomainEntity(gameId, isStarting);
    const newPage = await this.pageRepository.create(page, transaction);
    return newPage;
  }

  async update(
    pageId: number,
    updatePageReqDto: UpdatePageReqDto,
    backgroundImageId: number | null,
    transaction?: Prisma.TransactionClient | undefined,
  ): Promise<PageDomainEntity> {
    const page = await this.pageRepository.getOneById(pageId, transaction);
    if (!page) {
      throw new NotFoundException('페이지를 찾을 수 없습니다.');
    }
    const pageEntity = new PageDomainEntity(
      page.id,
      page.contents,
      page.title,
      page.gameId,
      page.isStarting,
      page.isEnding,
      page.version,
      page.createdAt,
      page.updatedAt,
      backgroundImageId,
    );

    pageEntity.setContent(updatePageReqDto.contents);
    pageEntity.setTitle(updatePageReqDto.title);
    pageEntity.setIsEnding(updatePageReqDto.isEnding);

    const updatedPage = await this.pageRepository.update(
      pageEntity,
      transaction,
    );

    // 페이지를 엔딩으로 설정한다면 해당 페이지에 연결된 선택지를 모두 삭제한다.
    if (pageEntity.isEnding) {
      await this.choicePageRepository.deleteMany(
        {
          where: {
            fromPageId: pageId,
          },
        },
        transaction,
      );
    }

    return updatedPage;
  }

  async delete(
    pageId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<void> {
    await this.pageRepository.delete(pageId, transaction);
  }
}
