import { Injectable } from '@nestjs/common';
import { PlayRepositoryPort } from '../port/play.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { PlayGame } from '@prisma/client';

@Injectable()
export class PlayRepository implements PlayRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

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
}
