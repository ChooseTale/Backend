import { Game, Prisma } from '@prisma/client';

export interface GetGameRepositoryPort {
  getCount(query: Prisma.GameCountArgs): Promise<number>;
  getGames(query: Prisma.GameFindManyArgs): Promise<Game[]>;
  getGameByIdOrThrow(gameId: number): Promise<Game>;
}
