import { Module } from '@nestjs/common';
import { ImageService } from './domain/image.service';

import { ImageRepository } from './infrastructure/image.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'IImageRepository',
      useClass: ImageRepository,
    },
    {
      provide: 'IImageService',
      useClass: ImageService,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'IImageService',
      useClass: ImageService,
    },
  ],
})
export class ImageModule {}
