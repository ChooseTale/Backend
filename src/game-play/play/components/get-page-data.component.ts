import { Inject, Injectable } from '@nestjs/common';
import { GetPageDataComponentPort } from './port/get-page-data.components.interface';
import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';
import { PlayPageEntity } from '../domain/entities/page.entity';

import { PageChoiceRepositoryPort } from '@@src/common/infrastructure/repositories/page-choices/port/page-choice.repository.interface';

@Injectable()
export class GetPageDataComponent implements GetPageDataComponentPort {
  constructor(
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('PageChoiceRepository')
    private readonly pageChoiceRepository: PageChoiceRepositoryPort,
  ) {}

  async getPageEntity(gameId: number, pageId: number): Promise<PlayPageEntity> {
    const page = await this.pageRepository.getByIdOrThrow(pageId);
    const choices = await this.pageChoiceRepository.getAllByPageId(pageId);

    return new PlayPageEntity(page, choices);
  }
}
