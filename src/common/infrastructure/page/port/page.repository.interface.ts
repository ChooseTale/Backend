import { Page } from '@prisma/client';

export interface PageRepositoryPort {
  getStartPageByGameId(gameId: number): Promise<Page>;
}
