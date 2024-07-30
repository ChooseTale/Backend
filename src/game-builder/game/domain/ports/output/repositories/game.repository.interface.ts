import { Prisma } from '@prisma/client';
import { GameDomainEntity } from '../../../entities/game.entity';
import { CreateGameDomainEntity } from '../../../entities/create-game.entity';

export interface IGameRepository {
  getById(id: number): Promise<GameDomainEntity | null>;
  create(
    game: CreateGameDomainEntity,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity>;
  update(game: GameDomainEntity): Promise<GameDomainEntity>;
}
