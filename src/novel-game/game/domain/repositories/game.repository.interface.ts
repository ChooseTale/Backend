import { Prisma } from '@prisma/client';
import { GameDomainEntity } from '../entities/game.entity';

export interface IGameRepository {
  create(
    game: GameDomainEntity,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity>;
}
