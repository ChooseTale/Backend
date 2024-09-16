import { PrismaService } from '@@prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PageChoiceRepositoryPort } from './port/page-choice.repository.interface';
import { ChoicePage } from '@prisma/client';

@Injectable()
export class PageChoiceRepository implements PageChoiceRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getOneByIdOrThrow(choiceId: number): Promise<ChoicePage> {
    const choice = await this.prismaService.choicePage.findUnique({
      where: {
        id: choiceId,
      },
    });
    if (!choice) {
      throw new NotFoundException('Choice not found');
    }
    return choice;
  }

  async getAllByPageId(pageId: number): Promise<ChoicePage[]> {
    return this.prismaService.choicePage.findMany({
      where: {
        fromPageId: pageId,
      },
    });
  }
}
