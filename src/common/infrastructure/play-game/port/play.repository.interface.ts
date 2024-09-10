import { PlayGame } from '@prisma/client';

export interface PlayRepositoryPort {
  getAllByUserId(userId: number): Promise<PlayGame[]>;
  getPlayById(playId: number): Promise<PlayGame | null>;
  getPlayByUserIdAndGameId(
    userId: number,
    gameId: number,
  ): Promise<PlayGame | null>;
}
