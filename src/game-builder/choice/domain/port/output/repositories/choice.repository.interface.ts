import { Prisma } from '@prisma/client';
import { CreateChoiceReqDto } from '../../../../applications/controllers/dto/create-choice.dto';
import { ChoiceDomainEntity } from '../../../entities/choice.entity';

export interface IChoiceRepository {
  getAllByPageId(
    pageId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getOneById(
    id: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity | null>;
  create(
    order: number,
    createChoiceReqDto: CreateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
}
