import { Injectable } from '@nestjs/common';
import { IPageRepository } from '../../domain/ports/output/repositories/page.repository.interface';
import { PageDomainEntity } from '../../domain/entities/page.entity';
import { PrismaService } from '@@prisma/prisma.service';
import { toDomain, toEntity } from '../mappeer/page.mapper';
import { Prisma } from '@prisma/client';
import { CreatePageDomainEntity } from '../../domain/entities/create-page.entity';

@Injectable()
export class PageRepository implements IPageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOneById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity | null> {
    const page = await (transaction ?? this.prisma).page.findUnique({
      where: { id },
    });
    return page ? toDomain(page) : null;
  }

  async create(
    page: CreatePageDomainEntity,
    transaction: Prisma.TransactionClient,
  ): Promise<PageDomainEntity> {
    const newPage = await (transaction ?? this.prisma).page.create({
      data: page,
    });
    return toDomain(newPage);
  }

  async update(
    page: PageDomainEntity,
    transaction: Prisma.TransactionClient | undefined,
  ): Promise<PageDomainEntity> {
    const pageEntity = toEntity(page);
    const updatedPage = await (transaction ?? this.prisma).page.update({
      where: { id: page.id },
      data: pageEntity,
    });
    return toDomain(updatedPage);
  }

  async delete(
    pageId: number,
    transaction: Prisma.TransactionClient | undefined,
  ): Promise<void> {
    await (transaction ?? this.prisma).page.delete({ where: { id: pageId } });
  }
}
