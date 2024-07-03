import { Injectable } from '@nestjs/common';
import { IPageRepository } from '../../domain/repositories/page.repository.interface';
import { PageDomainEntity } from '../../domain/entities/page.entity';
import { PrismaService } from '@@prisma/prisma.service';
import { toDomain, toEntity } from '../mappeer/page.mapper';

@Injectable()
export class PageRepository implements IPageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(page: PageDomainEntity): Promise<PageDomainEntity> {
    const pageEntity = toEntity(page);
    const newPage = await this.prisma.page.create({ data: pageEntity });
    return toDomain(newPage);
  }
}
