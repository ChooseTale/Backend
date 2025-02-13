import { Inject, Injectable } from '@nestjs/common';
import { GetPageDataComponentPort } from './port/get-page-data.components.interface';
import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';
import { PlayPageEntity } from '../domain/entities/page.entity';
import { ChoicePageRepositoryPort } from '@@src/common/infrastructure/repositories/choice-page/port/choice-page.repository.interface';
import { IPageImageRepository } from '@@src/game-builder/page/domain/ports/output/repositories/page-image.repository.interface';

@Injectable()
export class GetPageDataComponent implements GetPageDataComponentPort {
  constructor(
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('ChoicePageRepository')
    private readonly choicePageRepository: ChoicePageRepositoryPort,
    @Inject('PageImageRepository')
    private readonly pageImageRepository: IPageImageRepository,
  ) {}

  async getPageEntity(gameId: number, pageId: number): Promise<PlayPageEntity> {
    const page = await this.pageRepository.getByIdOrThrow(pageId);
    const choices = await this.choicePageRepository.getAllByPageId(pageId);
    if (page.backgroundImageId) {
      const pageImage = await this.pageImageRepository.getOneByIdOrThrow(
        page.backgroundImageId,
      );
      return new PlayPageEntity(page, choices, pageImage);
    }
    return new PlayPageEntity(page, choices);
  }
}
