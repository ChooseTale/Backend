import { PageImage } from '@prisma/client';
import { IPageImageRepository } from '../../domain/ports/output/repositories/page-image.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class PageImageRepository implements IPageImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOneByIdOrThrow(id: number): Promise<PageImage> {
    const pageImage = await this.prisma.pageImage.findUnique({
      where: { id },
    });
    if (!pageImage) {
      throw new NotFoundException('Page image not found');
    }
    return pageImage;
  }

  async uploadImageForPage(file: { url: string }): Promise<PageImage> {
    return await this.prisma.pageImage.create({
      data: { url: file.url },
    });
  }
}
