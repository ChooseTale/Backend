import { Inject, Injectable } from '@nestjs/common';
import { ChoiceRepositoryInterface } from '../domain/repositories/choice.repository.interface';
import { CreateChoiceReqDto } from '../applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChoiceService {
  constructor(
    @Inject('choiceRepositoryInterface')
    private readonly choiceRepository: ChoiceRepositoryInterface,
  ) {}

  async getAllByPageId(pageId: number, transaction: Prisma.TransactionClient) {
    return this.choiceRepository.getAllByPageId(pageId, transaction);
  }

  async create(
    createChoiceReqDto: CreateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ) {
    const pageChoices = await this.choiceRepository.getAllByPageId(
      createChoiceReqDto.parentPageId,
      transaction,
    );

    if (pageChoices.length > 4) {
      throw new Error('초이스는 4개까지만 생성 가능합니다.');
    }

    const choice = await this.choiceRepository.create(
      pageChoices.length + 1,
      createChoiceReqDto,
      transaction,
    );
    return choice;
  }
}
