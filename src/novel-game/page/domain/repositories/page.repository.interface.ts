import { Prisma } from '@prisma/client';
import { PageDomainEntity } from '../entities/page.entity';

export interface IPageRepository {
  getById(id: number): Promise<PageDomainEntity | null>;
  create(
    page: PageDomainEntity,
    transaction: Prisma.TransactionClient | undefined,
  ): Promise<PageDomainEntity>;
}
