import { PageImage } from '@prisma/client';

export interface IPageImageRepository {
  getOneByIdOrThrow(id: number): Promise<PageImage>;
}
