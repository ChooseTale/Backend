import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GameDomainEntity } from '../../domain/entities/game.entity';
import { toDomain, toEntityForCreate } from '../convertor/game.convertor';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: number) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });
    return game ? toDomain(game) : null;
  }

  async create(game: GameDomainEntity, transaction: Prisma.TransactionClient) {
    const gameEntity = toEntityForCreate(game);
    const newGame = await (transaction ?? this.prisma).game.create({
      data: gameEntity,
    });
    return toDomain(newGame);
  }
}
