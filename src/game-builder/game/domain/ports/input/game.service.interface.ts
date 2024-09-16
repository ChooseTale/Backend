import { Prisma } from '@prisma/client';
import { GameDomainEntity } from '../../entities/game.entity';
import { UpdateGameReqDto } from '@@src/game-builder/game/application/controllers/dto/update-game.dto';

export interface IGameService {
  getById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<GameDomainEntity | null>;
  create(
    userId: number,
    title: string,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity>;
  update(
    id: number,
    userId: number,
    updateGameReqDto: UpdateGameReqDto,
  ): Promise<GameDomainEntity>;
}
