import { Inject, Injectable } from '@nestjs/common';
import { StartGameComponentInterface } from './port/start-game.component.interface';
import { PlayRepositoryPort } from '@@src/common/infrastructure/repositories/play-game/port/play.repository.interface';
import { PlayGameEntity } from '../entities/play-game.entity';

@Injectable()
export class StartGameComponent implements StartGameComponentInterface {
  constructor(
    @Inject('PlayGameRepository')
    private readonly playGameRepository: PlayRepositoryPort,
  ) {}

  async getContinuePlayGame(
    userId: number,
    gameId: number,
  ): Promise<PlayGameEntity | null> {
    const playGames = await this.playGameRepository.getContinuePlayGame(
      userId,
      gameId,
    );
    if (!playGames) {
      return null;
    }
    return new PlayGameEntity(playGames);
  }

  async resetContinuePlayGame(playGameId: number): Promise<void> {
    await this.playGameRepository.delete(playGameId);
  }

  async createNewPlayGame(
    userId: number,
    gameId: number,
  ): Promise<PlayGameEntity> {
    // 새로운 플레이 생성시 첫 페이지
    const newPlayGame = await this.playGameRepository.create(userId, gameId);
    return new PlayGameEntity(newPlayGame);
  }
}
