import { PrismaService } from '@@prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetGameRepositoryPort } from '../port/get-game.repository';
import { Game, Prisma } from '@prisma/client';

@Injectable()
export class GetGameRepository implements GetGameRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getGames(query: Prisma.GameFindManyArgs): Promise<Game[]> {
    return this.prismaService.game.findMany(query);
  }

  async getGameByIdOrThrow(gameId: number): Promise<Game> {
    const game = await this.prismaService.game.findUnique({
      where: { id: gameId },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }
}
