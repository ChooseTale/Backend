import { Inject, Injectable } from '@nestjs/common';
import { PageDomainEntity } from './entities/page.entity';
import { CreatePageReqDto } from '../application/controllers/dto/create-page.dto';
import { IPageRepository } from './ports/output/repositories/page.repository.interface';
import { Prisma } from '@prisma/client';
import { IPageService } from './ports/input/page.service.interface';
import { CreatePageDomainEntity } from './entities/create-page.entity';
import { IChatGPTPagePort } from './ports/output/chatgpt/chatgpt.interface';

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
}
