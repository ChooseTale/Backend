import { Inject, Injectable } from '@nestjs/common';
import { PageDomainEntity } from '../domain/entities/page.entity';
import {
  CreatePageReqDto,
  CreatePageResDto,
} from '../controllers/dto/create-page.dto';
import { IPageRepository } from '../domain/repositories/page.repository.interface';

@Injectable()
export class PageService {
  constructor(
    @Inject('IPageRepository') private readonly pageRepository: IPageRepository,
  ) {}

  async create(
    gameId: number,
    createPageReqDto: CreatePageReqDto,
  ): Promise<CreatePageResDto> {
    const page = new PageDomainEntity(
      0,
      createPageReqDto.content ?? '',
      '요약',
      gameId,
      createPageReqDto.isEnding ?? false,
      new Date(),
      new Date(),
    );
    const newPage = await this.pageRepository.create(page);
    return {
      id: newPage.id,
    };
  }
}
