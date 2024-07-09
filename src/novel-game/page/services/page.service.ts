import { Inject, Injectable } from '@nestjs/common';
import { PageDomainEntity } from '../domain/entities/page.entity';
import { CreatePageReqDto } from '../controllers/dto/create-page.dto';
import { IPageRepository } from '../domain/repositories/page.repository.interface';
import { Prisma } from '@prisma/client';
import { IPageService } from '../controllers/services/page.service.interface';

@Injectable()
export class PageService implements IPageService {
  constructor(
    @Inject('IPageRepository') private readonly pageRepository: IPageRepository,
  ) {}

  async getOneById(id: number, transaction?: Prisma.TransactionClient) {
    return await this.pageRepository.getOneById(id, transaction);
  }

  async create(
    gameId: number,
    createPageReqDto?: CreatePageReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity> {
    const page = new PageDomainEntity(
      0,
      createPageReqDto?.content ?? '',
      '요약',
      gameId,
      createPageReqDto?.isEnding ?? false,
      new Date(),
      new Date(),
    );
    const newPage = await this.pageRepository.create(page, transaction);
    return newPage;
  }
}
