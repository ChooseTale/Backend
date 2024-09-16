import { Injectable } from '@nestjs/common';

import { ImageRepositoryPort } from '../port/image.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { Image } from '@prisma/client';

@Injectable()
export class ImageRepository implements ImageRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getImageById(imageId: number): Promise<Image | null> {
    return this.prismaService.image.findUnique({
      where: { id: imageId },
    });
  }
}
