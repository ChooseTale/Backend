import { Inject, Injectable } from '@nestjs/common';
import { PageDomainEntity } from '../domain/entities/page.entity';
import { CreatePageReqDto } from '../controllers/dto/create-page.dto';
import { IPageRepository } from '../domain/repositories/page.repository.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class PageService {
  constructor(
    @Inject('IPageRepository') private readonly pageRepository: IPageRepository,
  ) {}

  async getById(id: number) {
    return await this.pageRepository.getById(id);
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
