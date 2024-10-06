import { Prisma } from '@prisma/client';
import { ListPageEntity } from '../../domain/entities/list-page.entity';

export interface PageNationComponentInterface {
  getPageEntity: (query: Prisma.GameFindManyArgs) => Promise<ListPageEntity>;
}
