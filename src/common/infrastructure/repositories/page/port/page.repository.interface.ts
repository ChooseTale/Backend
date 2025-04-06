import { Page } from '@prisma/client';
import { Prisma } from '@prisma/client';
export interface PageRepositoryPort {
  getAll(query: Prisma.PageFindManyArgs): Promise<Page[]>;
  getAllByGameId(gameId: number): Promise<Page[]>;
  getStartPageByGameId(gameId: number): Promise<Page>;
  getByIdOrThrow(id: number): Promise<Page>;
}
