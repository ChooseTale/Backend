import { PlayGame } from '@prisma/client';

export interface PlayRepositoryPort {
  getContinuePlayGame(userId: number, gameId: number): Promise<PlayGame | null>;
  getAllByUserId(userId: number): Promise<PlayGame[]>;
  getPlayById(playId: number): Promise<PlayGame | null>;
  getPlayByUserIdAndGameId(
    userId: number,
    gameId: number,
  ): Promise<PlayGame | null>;
  create(userId: number, gameId: number): Promise<PlayGame>;
  delete(playId: number): Promise<void>;
}
