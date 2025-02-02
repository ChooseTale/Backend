import { PageImage } from '@prisma/client';

export interface IPageImageRepository {
  getOneByIdOrThrow(id: number): Promise<PageImage>;
  uploadImageForPage(file: { url: string }): Promise<PageImage>;
}
