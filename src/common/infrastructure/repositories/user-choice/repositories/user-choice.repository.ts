import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserChoice } from '@prisma/client';
import { UserChoiceRepositoryPort } from '../port/user-choice.repository.interface';

@Injectable()
export class UserChoiceRepository implements UserChoiceRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  getAllByPlayIds(playGameIds: number[]): Promise<UserChoice[]> {
    return this.prismaService.userChoice.findMany({
      where: {
        playGameId: {
          in: playGameIds,
        },
      },
    });
  }

  getAllByPlayId(playGameId: number): Promise<UserChoice[]> {
    return this.prismaService.userChoice.findMany({
      where: {
        playGameId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  getAllByChoicePageIds(choicePageIds: number[]): Promise<UserChoice[]> {
    return this.prismaService.userChoice.findMany({
      where: {
        choicePageId: {
          in: choicePageIds,
        },
      },
    });
  }

  create(playGameId: number, pageId: number): Promise<UserChoice> {
    return this.prismaService.userChoice.create({
      data: { playGameId, choicePageId: pageId },
    });
  }

  async deleteAllByPlayId(playGameId: number): Promise<void> {
    await this.prismaService.userChoice.deleteMany({
      where: {
        playGameId,
      },
    });
  }
}
