import { Injectable, NotFoundException } from '@nestjs/common';
import { PageRepositoryPort } from '../port/page.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { Page, Prisma } from '@prisma/client';

@Injectable()
export class PageRepository implements PageRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(query: Prisma.PageFindManyArgs): Promise<Page[]> {
    return this.prismaService.page.findMany(query);
  }

  async getAllByGameId(gameId: number): Promise<Page[]> {
    return this.prismaService.page.findMany({
      where: {
        gameId,
      },
    });
  }

  async getByIdOrThrow(id: number): Promise<Page> {
    const page = await this.prismaService.page.findUnique({
      where: {
        id,
      },
    });
    if (!page) {
      throw new NotFoundException('페이지를 찾을 수 없습니다.');
    }
    return page;
  }

  async getStartPageByGameId(gameId: number): Promise<Page> {
    const page = await this.prismaService.page.findFirst({
      where: {
        gameId,
        isStarting: true,
      },
    });
    if (!page) {
      throw new NotFoundException(
        '첫 페이지가 없는 게임은 존재할 수 없습니다.',
      );
    }
    return page;
  }
}
