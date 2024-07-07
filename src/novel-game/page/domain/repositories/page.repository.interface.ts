import { Prisma } from '@prisma/client';
import { PageDomainEntity } from '../entities/page.entity';

export interface IPageRepository {
  create(
    page: PageDomainEntity,
    transaction: Prisma.TransactionClient | undefined,
  ): Promise<PageDomainEntity>;
}
