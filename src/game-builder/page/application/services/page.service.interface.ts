import { Prisma } from '@prisma/client';
import { CreatePageReqDto } from '../controllers/dto/create-page.dto';
import { PageDomainEntity } from '../../domain/entities/page.entity';

export interface IPageService {
  getOneById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity | null>;
  create(
    gameId: number,
    abridgement: string,
    createPageReqDto: CreatePageReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity>;
}
