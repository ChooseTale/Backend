import { PrismaService } from '@@prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChoicePage } from '@prisma/client';
import { ChoicePageRepositoryPort } from './port/choice-page.repository.interface';

@Injectable()
export class ChoicePageRepository implements ChoicePageRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async getOneByIdOrThrow(choicePageId: number): Promise<ChoicePage> {
    const choicePage = await this.prisma.choicePage.findUnique({
      where: { id: choicePageId },
    });

    if (!choicePage) {
      throw new NotFoundException('Choice page not found');
    }

    return choicePage;
  }

  async getChoicePageByIds(choicePageIds: number[]): Promise<ChoicePage[]> {
    return this.prisma.choicePage.findMany({
      where: { id: { in: choicePageIds } },
    });
  }

  async getAllByPageId(pageId: number): Promise<ChoicePage[]> {
    return this.prisma.choicePage.findMany({
      where: { fromPageId: pageId },
    });
  }

  async getAllByFromPageIds(fromPageIds: number[]): Promise<ChoicePage[]> {
    return this.prisma.choicePage.findMany({
      where: { fromPageId: { in: fromPageIds } },
    });
  }
}
