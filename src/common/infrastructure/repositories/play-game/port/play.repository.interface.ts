import { PlayGame, Prisma } from '@prisma/client';

export interface PlayRepositoryPort {
  getAll(query: Prisma.PlayGameFindManyArgs<any>): Promise<PlayGame[]>;
  getContinuePlayGame(userId: number, gameId: number): Promise<PlayGame | null>;
  getAllByUserId(userId: number): Promise<PlayGame[]>;
  getAllByUserIdAndGameId(userId: number, gameId: number): Promise<PlayGame[]>;
  getPlayById(playId: number): Promise<PlayGame | null>;
  getPlayByUserIdAndGameId(
    userId: number,
    gameId: number,
  ): Promise<PlayGame | null>;
  create(userId: number, gameId: number): Promise<PlayGame>;
  update(playId: number, data: Partial<PlayGame>): Promise<PlayGame>;
  delete(playId: number): Promise<void>;
}
