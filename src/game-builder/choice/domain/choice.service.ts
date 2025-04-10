import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChoiceRepository } from './port/output/repositories/choice.repository.interface';
import { CreateChoiceReqDto } from '../applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { PageChoice } from './entities/page-choice.entity';
import { IChoiceService } from './port/input/choice.service.interface';
import { ChoiceDomainEntity } from './entities/choice.entity';
import { UpdateChoiceReqDto } from '../applications/controllers/dto/update-choice.dto';

@Injectable()
export class ChoiceService implements IChoiceService {
  constructor(
    @Inject('choiceRepositoryInterface')
    private readonly choiceRepository: IChoiceRepository,
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  async getAllByPageIds(
    pageIds: number[],
    transaction?: Prisma.TransactionClient | undefined,
  ): Promise<ChoiceDomainEntity[]> {
    return this.choiceRepository.getAllByPageIds(pageIds, transaction);
  }

  async getAllByFromPageId(
    pageId: number,
    transaction?: Prisma.TransactionClient,
  ) {
    return this.choiceRepository.getAllByFromPageId(pageId, transaction);
  }

  async getAllByToPageId(
    pageId: number,
    transaction?: Prisma.TransactionClient,
  ) {
    return this.choiceRepository.getAllByToPageId(pageId, transaction);
  }

  async getOneById(id: number, transaction?: Prisma.TransactionClient) {
    return this.choiceRepository.getOneById(id, transaction);
  }

  async create(
    gameId: number,
    createChoiceReqDto: CreateChoiceReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity> {
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

    const pageChoices = await this.choiceRepository.getAllByFromPageId(
      createChoiceReqDto.parentPageId,
      transaction,
    );

    const pageChoice = new PageChoice(
      createChoiceReqDto.parentPageId,
      pageChoices,
    );

    pageChoice.checkChoiceLength();

    const choice = await this.choiceRepository.create(
      gameId,
      pageChoices.length + 1,
      createChoiceReqDto,
      fromPage.version,
      transaction,
    );
    return choice;
  }

  async update(
    choiceId: number,
    updateChoiceReqDto: UpdateChoiceReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity> {
    const choice = await this.choiceRepository.getOneById(choiceId);
    if (!choice) {
      throw new NotFoundException('해당 선택지가 존재하지 않습니다.');
    }

    choice.updateChoice(updateChoiceReqDto);

    return this.choiceRepository.update(choiceId, choice, transaction);
  }

  async updateOrder(
    parentPageId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<void> {
    const pageChoices = await this.getAllByFromPageId(parentPageId);
    await Promise.all(
      pageChoices.map((pageChoice, idx) => {
        pageChoice.setOrder(idx + 1);
        return this.choiceRepository.update(
          pageChoice.id,
          pageChoice,
          transaction,
        );
      }),
    );
  }

  async delete(
    choiceId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<void> {
    const choice = await this.getOneById(choiceId, transaction);
    if (!choice) {
      throw new NotFoundException('해당 선택지가 존재하지 않습니다.');
    }

    await this.choiceRepository.deleteById(choiceId, transaction);
    await this.updateOrder(choice.parentPageId, transaction);
  }
}
