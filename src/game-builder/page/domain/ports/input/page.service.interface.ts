import { Prisma } from '@prisma/client';
import { CreatePageReqDto } from '../../../application/controllers/dto/create-page.dto';
import { PageDomainEntity } from '../../entities/page.entity';
import { UpdatePageReqDto } from '@@src/game-builder/page/application/controllers/dto/update-page.dto';

export interface IPageService {
  getOneById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity | null>;
  create(
    gameId: number,
    createPageReqDto: CreatePageReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity>;
  update(
    pageId: number,
    updatePageReqDto: UpdatePageReqDto,
    transaction?: Prisma.TransactionClient,
  ): Promise<PageDomainEntity>;
}
