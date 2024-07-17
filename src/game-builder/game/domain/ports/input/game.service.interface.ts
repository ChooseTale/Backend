import { Prisma } from '@prisma/client';
import { GameDomainEntity } from '../../entities/game.entity';

export interface IGameService {
  getById(id: number): Promise<GameDomainEntity | null>;
  create(
    userId: number,
    title: string,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity>;
}
