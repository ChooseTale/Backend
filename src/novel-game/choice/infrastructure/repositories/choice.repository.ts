import { Injectable } from '@nestjs/common';
import { ChoiceRepositoryInterface } from '../../domain/repositories/choice.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { CreateChoiceReqDto } from '../../applications/controllers/dto/create-choice.dto';
import { ChoiceDomainEntity } from '../../domain/entities/choice.entity';
import { toDomain } from '../mapper/choice.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChoiceRepository implements ChoiceRepositoryInterface {
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
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity> {
    const choice = await (transaction ?? this.prisma).choicePage.create({
      data: {
        fromPageId: createChoiceReqDto.parentPageId,
        toPageId: createChoiceReqDto.childPageId ?? null,
        title: createChoiceReqDto.title,
        description: createChoiceReqDto.description,
        order,
      },
    });
    return toDomain(choice);
  }
}
