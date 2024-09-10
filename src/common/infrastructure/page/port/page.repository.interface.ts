import { Page } from '@prisma/client';

export interface PageRepositoryPort {
  getAllByGameId(gameId: number): Promise<Page[]>;
  getStartPageByGameId(gameId: number): Promise<Page>;
  getByIdOrThrow(id: number): Promise<Page>;
}
