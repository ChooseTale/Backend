import { Inject, Injectable } from '@nestjs/common';
import { StartGameComponentInterface } from '../components/port/start-game.component.interface';
import { PlayGameEntity } from '../entities/play-game.entity';
import { FirstStartGameResDto } from '../../applications/dto/first-start-game.dto';

@Injectable()
export class FirstStartGameUsecase {
  constructor(
    @Inject('StartGameComponent')
    private readonly startGameComponent: StartGameComponentInterface,
  ) {}

  async execute(gameId: number, userId: number): Promise<FirstStartGameResDto> {
    const playGameEntity = await this.startGameComponent.getContinuePlayGame(
      gameId,
      userId,
    );

    let newPlayGame: PlayGameEntity;
    // 현재 진행중인 플레이가 있으면 초기화하고 새로운 플레이 생성
    if (playGameEntity) {
      // 초기화 컴포넌트
      await this.startGameComponent.resetContinuePlayGame(playGameEntity.id);
      // 새로운 게임 생성 컴포넌트
      newPlayGame = await this.startGameComponent.createNewPlayGame(
        userId,
        gameId,
      );
    }
    // 현재 진행중인 플레이가 없으면 새로운 플레이 생성
    else {
      newPlayGame = await this.startGameComponent.createNewPlayGame(
        userId,
        gameId,
      );
    }
    return {
      playId: newPlayGame.id,
    };
  }
}
