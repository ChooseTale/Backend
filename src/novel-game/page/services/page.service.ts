import { Inject, Injectable } from '@nestjs/common';
import { PageDomainEntity } from '../domain/entities/page.entity';
import { CreatePageReqDto } from '../application/controllers/dto/create-page.dto';
import { IPageRepository } from '../domain/repositories/page.repository.interface';
import { Prisma } from '@prisma/client';
import { IPageService } from '../application/services/page.service.interface';

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
    abridgement: string,
    createPageReqDto?: CreatePageReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity> {
    const page = new PageDomainEntity(
      0,
      createPageReqDto?.content ?? '',
      abridgement,
      gameId,
      createPageReqDto?.isEnding ?? false,
      new Date(),
      new Date(),
    );
    const newPage = await this.pageRepository.create(page, transaction);
    return newPage;
  }
}
