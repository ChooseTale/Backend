import { GetPlayGameResultEntity } from '../../domain/entities/get-play-game-result.entity';

export interface ResultComponentPort {
  getPlayGameResultEntity(
    userId: number,
    gameId: number,
  ): Promise<GetPlayGameResultEntity>;
}
