import { Prisma } from '@prisma/client';
import {
  CreateChoiceReqDto,
  CreateChoiceResDto,
} from '../controllers/dto/create-choice.dto';
import { UpdateChoiceReqDto } from '../controllers/dto/update-choice.dto';
import { ChoiceDomainEntity } from '../../domain/entities/choice.entity';

export interface IChoiceService {
  create(
    body: CreateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ): Promise<CreateChoiceResDto>;
  update(
    id: number,
    body: UpdateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity>;
}
