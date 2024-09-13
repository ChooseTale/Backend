import { Game } from '@prisma/client';

export interface GetGameRepositoryPort {
  getGameByIdOrThrow(gameId: number): Promise<Game>;
}
