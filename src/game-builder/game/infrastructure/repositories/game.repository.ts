import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { toDomain } from '../mapper/game.mapper';
import { Prisma } from '@prisma/client';
import { IGameRepository } from '../../domain/ports/output/repositories/game.repository.interface';
import { CreateGameDomainEntity } from '../../domain/entities/create-game.entity';
import { GameDomainEntity } from '../../domain/entities/game.entity';

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: number) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });
    return game ? toDomain(game) : null;
  }

  async create(
    game: CreateGameDomainEntity,
    transaction: Prisma.TransactionClient,
  ) {
    const newGame = await (transaction ?? this.prisma).game.create({
      data: game,
    });
    return toDomain(newGame);
  }

  async update(game: GameDomainEntity) {
    const updatedGame = await this.prisma.game.update({
      where: { id: game.id },
      data: game,
    });
    return toDomain(updatedGame);
  }
}
