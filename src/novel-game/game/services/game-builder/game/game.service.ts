import { GameDomainEntity } from '@@src/novel-game/game/domain/entities/game.entity';
import { IGameRepository } from '@@src/novel-game/game/domain/repositories/game.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  constructor(
    @Inject('IGameRepository') private readonly gameRepository: IGameRepository,
  ) {}

  async create(userId: number, title: string): Promise<GameDomainEntity> {
    const game = new GameDomainEntity(
      0,
      title,
      '',
      true,
      'OTHER',
      null,
      userId,
      new Date(),
      new Date(),
    );

    const newGame = await this.gameRepository.create(game);

    return newGame;
  }
}
