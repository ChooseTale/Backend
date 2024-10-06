import { Game, Prisma } from '@prisma/client';

export interface GetGameRepositoryPort {
  getGames(query: Prisma.GameFindManyArgs): Promise<Game[]>;
  getGameByIdOrThrow(gameId: number): Promise<Game>;
}
