import { CreateChoiceReqDto } from '@@src/game-builder/choice/applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';
import { ChoiceDomainEntity } from '../../entities/choice.entity';

export interface IChoiceService {
  getAllByPageId(
    pageId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getOneById(
    id: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity | null>;
  create(
    createChoiceReqDto: CreateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
}
