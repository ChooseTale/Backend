import { Prisma } from '@prisma/client';
import { GameDomainEntity } from '../entities/game.entity';

export interface IGameRepository {
  getById(id: number): Promise<GameDomainEntity | null>;
  create(
    game: GameDomainEntity,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity>;
}
