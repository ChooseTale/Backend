import { Inject, Injectable } from '@nestjs/common';
import { GetPageDataComponentPort } from './port/get-page-data.components.interface';
import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';
import { PlayPageEntity } from '../domain/entities/page.entity';
import { ChoicePageRepositoryPort } from '@@src/common/infrastructure/repositories/choice-page/port/choice-page.repository.interface';

@Injectable()
export class GetPageDataComponent implements GetPageDataComponentPort {
  constructor(
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('ChoicePageRepository')
    private readonly choicePageRepository: ChoicePageRepositoryPort,
  ) {}

  async getPageEntity(gameId: number, pageId: number): Promise<PlayPageEntity> {
    const page = await this.pageRepository.getByIdOrThrow(pageId);
    const choices = await this.choicePageRepository.getAllByPageId(pageId);

    return new PlayPageEntity(page, choices);
  }
}
