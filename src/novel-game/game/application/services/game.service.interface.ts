import { Prisma } from '@prisma/client';
import { GameDomainEntity } from '../../domain/entities/game.entity';

export interface IGameService {
  getOneById(
    id: number,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity | null>;
  create(
    userId: number,
    title: string,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity>;
}
