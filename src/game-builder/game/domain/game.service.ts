import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { IGameRepository } from '@@src/game-builder/game/domain/ports/output/repositories/game.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IGameService } from './ports/input/game.service.interface';
import { CreateGameDomainEntity } from './entities/create-game.entity';

@Injectable()
export class GameService implements IGameService {
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
    const game = new CreateGameDomainEntity(userId, title);

    const newGame = await this.gameRepository.create(game, transaction);

    return newGame;
  }
}
