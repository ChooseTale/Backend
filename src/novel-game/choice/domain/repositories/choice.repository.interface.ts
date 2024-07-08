import { Prisma } from '@prisma/client';
import { CreateChoiceReqDto } from '../../applications/controllers/dto/create-choice.dto';
import { ChoiceDomainEntity } from '../entities/choice.entity';

export interface ChoiceRepositoryInterface {
  getAllByPageId(
    pageId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  create(
    order: number,
    createChoiceReqDto: CreateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
}
