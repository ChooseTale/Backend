import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChoiceRepository } from './port/output/repositories/choice.repository.interface';
import { CreateChoiceReqDto } from '../applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { PageChoice } from './entities/page-choice.entity';
import { IChoiceService } from './port/input/choice.service.interface';
import { ChoiceDomainEntity } from './entities/choice.entity';

@Injectable()
export class ChoiceService implements IChoiceService {
  constructor(
    @Inject('choiceRepositoryInterface')
    private readonly choiceRepository: IChoiceRepository,
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  async getAllByPageId(pageId: number, transaction: Prisma.TransactionClient) {
    return this.choiceRepository.getAllByPageId(pageId, transaction);
  }

  async getOneById(id: number, transaction: Prisma.TransactionClient) {
    return this.choiceRepository.getOneById(id, transaction);
  }

  async create(
    createChoiceReqDto: CreateChoiceReqDto,
  ): Promise<ChoiceDomainEntity> {
    const fromPage = await this.pageService.getOneById(
      createChoiceReqDto.parentPageId,
    );

    if (!fromPage) {
      throw new NotFoundException('해당 페이지가 존재하지 않습니다.');
    }
    fromPage.checkIsEnding();

    if (createChoiceReqDto.childPageId) {
      const childPage = await this.pageService.getOneById(
        createChoiceReqDto.childPageId,
      );
      if (!childPage) {
        throw new NotFoundException('해당 페이지가 존재하지 않습니다.');
      }
    }

    const pageChoices = await this.choiceRepository.getAllByPageId(
      createChoiceReqDto.parentPageId,
    );

    const pageChoice = new PageChoice(
      createChoiceReqDto.parentPageId,
      pageChoices,
    );

    pageChoice.checkChoiceLength();

    const choice = await this.choiceRepository.create(
      pageChoices.length + 1,
      createChoiceReqDto,
      fromPage.version,
    );
    return choice;
  }
}
