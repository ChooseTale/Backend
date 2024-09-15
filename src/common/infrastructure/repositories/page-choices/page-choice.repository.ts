import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PageChoiceRepositoryPort } from './port/page-choice.repository.interface';
import { ChoicePage } from '@prisma/client';

@Injectable()
export class PageChoiceRepository implements PageChoiceRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllByPageId(pageId: number): Promise<ChoicePage[]> {
    return this.prismaService.choicePage.findMany({
      where: {
        fromPageId: pageId,
      },
    });
  }
}
