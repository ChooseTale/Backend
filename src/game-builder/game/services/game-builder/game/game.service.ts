import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { IGameRepository } from '@@src/game-builder/game/domain/repositories/game.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(
    @Inject('IGameRepository') private readonly gameRepository: IGameRepository,
  ) {}

  async getById(id: number) {
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