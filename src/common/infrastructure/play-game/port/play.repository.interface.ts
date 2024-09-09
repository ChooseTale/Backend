import { PlayGame } from '@prisma/client';

export interface PlayRepositoryPort {
  getPlayById(playId: number): Promise<PlayGame | null>;
  getPlayByUserIdAndGameId(
    userId: number,
    gameId: number,
  ): Promise<PlayGame | null>;
}
