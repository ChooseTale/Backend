import { PlayGameEntity } from '../../entities/play-game.entity';

export interface StartGameComponentInterface {
  getContinuePlayGame(
    userId: number,
    gameId: number,
  ): Promise<PlayGameEntity | null>;
  resetContinuePlayGame(playGameId: number): Promise<void>;
  createNewPlayGame(userId: number, gameId: number): Promise<PlayGameEntity>;
}
