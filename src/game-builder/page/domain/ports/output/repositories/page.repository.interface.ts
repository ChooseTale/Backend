import { Prisma } from '@prisma/client';
import { PageDomainEntity } from '../../../entities/page.entity';
import { CreatePageDomainEntity } from '../../../entities/create-page.entity';

export interface IPageRepository {
  getOneById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity | null>;
  create(
    page: CreatePageDomainEntity,
    transaction: Prisma.TransactionClient | undefined,
  ): Promise<PageDomainEntity>;
  update(
    page: PageDomainEntity,
    transaction: Prisma.TransactionClient | undefined,
  ): Promise<PageDomainEntity>;
  delete(pageId: number, transaction?: Prisma.TransactionClient): Promise<void>;
}
