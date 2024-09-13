import { Injectable } from '@nestjs/common';
import { PlayRepositoryPort } from '../port/play.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { PlayGame } from '@prisma/client';

@Injectable()
export class PlayRepository implements PlayRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getContinuePlayGame(
    userId: number,
    gameId: number,
  ): Promise<PlayGame | null> {
    return this.prismaService.playGame.findFirst({
      where: { userId, gameId, isEnded: false },
    });
  }

  async getAllByUserId(userId: number): Promise<PlayGame[]> {
    return this.prismaService.playGame.findMany({
      where: { userId },
    });
  }

  async getPlayById(playId: number): Promise<PlayGame | null> {
    return this.prismaService.playGame.findUnique({
      where: { id: playId },
    });
  }

  async getPlayByUserIdAndGameId(
    userId: number,
    gameId: number,
  ): Promise<PlayGame | null> {
    return this.prismaService.playGame.findFirst({
      where: { userId, gameId },
    });
  }

  async create(userId: number, gameId: number): Promise<PlayGame> {
    return await this.prismaService.playGame.create({
      data: { userId, gameId },
    });
  }

  async delete(playId: number): Promise<void> {
    await this.prismaService.playGame.delete({
      where: { id: playId },
    });
  }
}
