import { IGameService } from '@@src/novel-game/game/application/services/game.service.interface';
import { GameDomainEntity } from '@@src/novel-game/game/domain/entities/game.entity';
import { IGameRepository } from '@@src/novel-game/game/domain/repositories/game.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameService implements IGameService {
  constructor(
    @Inject('IGameRepository') private readonly gameRepository: IGameRepository,
  ) {}

  async getOneById(id: number) {
    return await this.gameRepository.getById(id);
  }

  async create(
    userId: number,
    title: string,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity> {
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

    const newGame = await this.gameRepository.create(game, transaction);

    return newGame;
  }
}
