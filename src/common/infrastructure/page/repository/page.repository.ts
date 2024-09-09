import { Injectable, NotFoundException } from '@nestjs/common';
import { PageRepositoryPort } from '../port/page.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { Page } from '@prisma/client';

@Injectable()
export class PageRepository implements PageRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

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
