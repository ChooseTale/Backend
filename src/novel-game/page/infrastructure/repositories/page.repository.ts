import { Injectable } from '@nestjs/common';
import { IPageRepository } from '../../domain/repositories/page.repository.interface';
import { PageDomainEntity } from '../../domain/entities/page.entity';
import { PrismaService } from '@@prisma/prisma.service';
import { toDomain, toEntityForCreate } from '../mappeer/page.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PageRepository implements IPageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: number): Promise<PageDomainEntity | null> {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });
    return page ? toDomain(page) : null;
  }

  async create(
    page: PageDomainEntity,
    transaction: Prisma.TransactionClient,
  ): Promise<PageDomainEntity> {
    const pageEntity = toEntityForCreate(page);
    const newPage = await (transaction ?? this.prisma).page.create({
      data: pageEntity,
    });
    return toDomain(newPage);
  }
}
