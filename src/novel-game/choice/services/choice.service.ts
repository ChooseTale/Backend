import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChoiceRepository } from '../domain/repositories/choice.repository.interface';
import { CreateChoiceReqDto } from '../applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';
import { IPageService } from '@@src/novel-game/page/application/services/page.service.interface';
import { PageChoice } from '../domain/entities/page-choice.entity';

@Injectable()
export class ChoiceService {
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
    transaction: Prisma.TransactionClient,
  ) {
    const fromPage = await this.pageService.getOneById(
      createChoiceReqDto.parentPageId,
      transaction,
    );
    if (!fromPage) {
      throw new NotFoundException('해당 페이지가 존재하지 않습니다.');
    }
    fromPage.checkIsEnding();

    if (createChoiceReqDto.childPageId) {
      const childPage = await this.pageService.getOneById(
        createChoiceReqDto.childPageId,
        transaction,
      );
      if (!childPage) {
        throw new NotFoundException('해당 페이지가 존재하지 않습니다.');
      }
    }

    const pageChoices = await this.choiceRepository.getAllByPageId(
      createChoiceReqDto.parentPageId,
      transaction,
    );

    const pageChoice = new PageChoice(
      createChoiceReqDto.parentPageId,
      pageChoices,
    );

    pageChoice.checkChoiceLength();

    const choice = await this.choiceRepository.create(
      pageChoices.length + 1,
      createChoiceReqDto,
      transaction,
    );
    return choice;
  }
}
