import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PageDomainEntity } from './entities/page.entity';
import { CreatePageReqDto } from '../application/controllers/dto/create-page.dto';
import { IPageRepository } from './ports/output/repositories/page.repository.interface';
import { Prisma } from '@prisma/client';
import { IPageService } from './ports/input/page.service.interface';
import { CreatePageDomainEntity } from './entities/create-page.entity';
import { IChatGPTPagePort } from './ports/output/chatgpt/chatgpt.interface';
import { UpdatePageReqDto } from '../application/controllers/dto/update-page.dto';

@Injectable()
export class PageService implements IPageService {
  constructor(
    @Inject('IPageRepository') private readonly pageRepository: IPageRepository,
    @Inject('IChatGPTPagePort') private readonly chatGPT: IChatGPTPagePort,
  ) {}

  async getOneById(id: number, transaction?: Prisma.TransactionClient) {
    return await this.pageRepository.getOneById(id, transaction);
  }

  async create(
    gameId: number,
    createPageReqDto: CreatePageReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity> {
    const abridgedContent = await this.chatGPT.getAbridgedContent(
      createPageReqDto?.content,
    );

    const page = new CreatePageDomainEntity(
      createPageReqDto?.content ?? '',
      abridgedContent,
      gameId,
      createPageReqDto?.isEnding ?? false,
    );
    const newPage = await this.pageRepository.create(page, transaction);
    return newPage;
  }

  async update(
    pageId: number,
    updatePageReqDto: UpdatePageReqDto,
    transaction?: Prisma.TransactionClient | undefined,
  ): Promise<PageDomainEntity> {
    const page = await this.pageRepository.getOneById(pageId, transaction);
    if (!page) {
      throw new NotFoundException('페이지를 찾을 수 없습니다.');
    }
    const newPage = new PageDomainEntity(
      page.id,
      page.content,
      page.abridgement,
      page.gameId,
      page.isEnding,
      page.version,
      page.createdAt,
      page.updatedAt,
    );

    // 요약본이 같은데 컨텐츠가 변경되었다면 새로운 요약본을 생성한다.
    if (
      page.checkShouldUpdateAbridgement(
        updatePageReqDto.content,
        updatePageReqDto.abridgement,
      )
    ) {
      newPage.setAbridgement(
        await this.chatGPT.getAbridgedContent(updatePageReqDto?.content),
      );
    }

    // 요약본이 다르고 컨텐츠가 다르다면 그대로 저장한다.
    // 또는 요약본이 다르고 컨텐츠가 같다면 그대로 저장한다.
    if (
      page.checkCanUpdateByUpdatedData(
        updatePageReqDto.content,
        updatePageReqDto.abridgement,
      )
    ) {
      newPage.setContent(updatePageReqDto.content);
      newPage.setAbridgement(updatePageReqDto.abridgement);
    }

    newPage.isEnding = updatePageReqDto.isEnding;

    const updatedPage = await this.pageRepository.update(newPage, transaction);
    return updatedPage;
  }
}
