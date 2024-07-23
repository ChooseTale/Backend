import { CreateChoiceReqDto } from '@@src/game-builder/choice/applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';
import { ChoiceDomainEntity } from '../../entities/choice.entity';
import { UpdateChoiceReqDto } from '@@src/game-builder/choice/applications/controllers/dto/update-choice.dto';

export interface IChoiceService {
  getAllByPageIds(
    pageIds: number[],
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getAllByPageId(
    pageId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]>;
  getOneById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity | null>;
  create(createChoiceReqDto: CreateChoiceReqDto): Promise<ChoiceDomainEntity>;
  update(
    choiceId: number,
    updateChoiceReqDto: UpdateChoiceReqDto,
  ): Promise<ChoiceDomainEntity>;
}
