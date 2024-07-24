import { Prisma } from '@prisma/client';
import { CreateChoiceReqDto } from '../../../../applications/controllers/dto/create-choice.dto';
import { ChoiceDomainEntity } from '../../../entities/choice.entity';

export interface IChoiceRepository {
  getAllByPageIds(
    pageIds: number[],
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getAllByPageId(
    pageId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getOneById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity | null>;
  create(
    order: number,
    createChoiceReqDto: CreateChoiceReqDto,
    pageVersion: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
  update(
    choiceId: number,
    choice: ChoiceDomainEntity,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
  delete(
    choiceId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<void>;
}
