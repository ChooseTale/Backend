import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { IChoiceRepository } from '../../domain/port/output/repositories/choice.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { CreateChoiceReqDto } from '../../applications/controllers/dto/create-choice.dto';
import { ChoiceDomainEntity } from '../../domain/entities/choice.entity';
import { toDomain } from '../mapper/choice.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChoiceRepository implements IChoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByPageIds(
    pageIds: number[],
    transaction?: Prisma.TransactionClient | undefined,
  ): Promise<ChoiceDomainEntity[]> {
    const choices = await (transaction ?? this.prisma).choicePage.findMany({
      where: {
        fromPageId: {
          in: pageIds,
        },
      },
    });
    return choices.map((choice) => toDomain(choice));
  }

  async getAllByFromPageId(
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

  async getAllByToPageId(
    pageId: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity[]> {
    const choices = await (transaction ?? this.prisma).choicePage.findMany({
      where: {
        toPageId: pageId,
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
    gameId: number,
    order: number,
    createChoiceReqDto: CreateChoiceReqDto,
    fromPageVersion: number,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity> {
    try {
      // 페이지 버전 업데이트

      // 선택지 생성
      await (transaction ?? this.prisma).choicePage.create({
        data: {
          gameId,
          toPageId: createChoiceReqDto.childPageId ?? null,
          title: createChoiceReqDto.title,
          order,
          fromPageId: createChoiceReqDto.parentPageId,
        },
      });

      // 업데이트된 페이지와 생성된 선택지 조회
      const result = await (transaction ?? this.prisma).page.findUnique({
        where: {
          id: createChoiceReqDto.parentPageId,
        },
        include: {
          fromPage: true,
        },
      });

      const createdFromPage = result?.fromPage[result?.fromPage.length - 1];

      if (!createdFromPage) {
        throw new BadRequestException('선택지가 생성되지 않음.');
      }

      return toDomain(createdFromPage);
    } catch (err) {
      throw new BadRequestException(`선택지 생성 실패`);
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
        toPageId: choice.childPageId,
        order: choice.order,
      },
      where: {
        id: choiceId,
      },
    });

    return toDomain(updatedChoice);
  }

  async deleteMany(
    query: Prisma.ChoicePageDeleteManyArgs,
    transaction?: Prisma.TransactionClient,
  ): Promise<void> {
    await (transaction ?? this.prisma).choicePage.deleteMany(query);
  }

  async deleteById(
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
