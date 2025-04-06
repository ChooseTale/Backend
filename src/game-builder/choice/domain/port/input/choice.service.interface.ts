import { CreateChoiceReqDto } from '@@src/game-builder/choice/applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';
import { ChoiceDomainEntity } from '../../entities/choice.entity';
import { UpdateChoiceReqDto } from '@@src/game-builder/choice/applications/controllers/dto/update-choice.dto';

export interface IChoiceService {
  getAllByPageIds(
    pageIds: number[],
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getAllByFromPageId(
    pageId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getAllByToPageId(
    pageId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getOneById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity | null>;
  create(
    gameId: number,
    createChoiceReqDto: CreateChoiceReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
  update(
    choiceId: number,
    updateChoiceReqDto: UpdateChoiceReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
  delete(
    choiceId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<void>;
}
