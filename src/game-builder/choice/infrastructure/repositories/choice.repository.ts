import { Injectable } from '@nestjs/common';
import { IChoiceRepository } from '../../domain/port/output/repositories/choice.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { CreateChoiceReqDto } from '../../applications/controllers/dto/create-choice.dto';
import { ChoiceDomainEntity } from '../../domain/entities/choice.entity';
import { toDomain } from '../mapper/choice.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChoiceRepository implements IChoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByPageId(
    pageId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]> {
    const choices = await (transaction ?? this.prisma).choicePage.findMany({
      where: {
        fromPageId: pageId,
      },
    });
    return choices.map((choice) => toDomain(choice));
  }

  async getOneById(
    id: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity | null> {
    const choice = await (transaction ?? this.prisma).choicePage.findUnique({
      where: {
        id,
      },
    });
    return choice ? toDomain(choice) : null;
  }

  async create(
    order: number,
    createChoiceReqDto: CreateChoiceReqDto,
    fromPageVersion: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity> {
    try {
      const updatedPage = await (transaction ?? this.prisma).page.update({
        data: {
          version: {
            increment: 1,
          },
          fromPage: {
            create: {
              toPageId: createChoiceReqDto.childPageId ?? null,
              title: createChoiceReqDto.title,
              description: createChoiceReqDto.description,
              order,
            },
          },
        },
        where: {
          id: createChoiceReqDto.parentPageId,
          version: fromPageVersion,
        },
        include: {
          fromPage: true,
        },
      });

      const createdFromPage =
        updatedPage.fromPage[updatedPage.fromPage.length - 1];

      if (!createdFromPage) {
        throw new Error('Page not found');
      }

      return toDomain(createdFromPage);
    } catch (err) {
      throw new Error('업데이트 실패');
    }
  }

  async update(
    choiceId: number,
    choice: ChoiceDomainEntity,
    transaction?: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity> {
    const updatedChoice = await (transaction ?? this.prisma).choicePage.update({
      data: {
        title: choice.title,
        description: choice.description,
        fromPageId: choice.parentPageId,
        toPageId: choice.childPageId,
        order: choice.order,
      },
      where: {
        id: choiceId,
      },
    });

    return toDomain(updatedChoice);
  }

  async delete(
    choiceId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<void> {
    await (transaction ?? this.prisma).choicePage.update({
      data: {
        order: 0,
      },
      where: {
        id: choiceId,
      },
    });
    await (transaction ?? this.prisma).choicePage.delete({
      where: {
        id: choiceId,
      },
    });
  }
}
