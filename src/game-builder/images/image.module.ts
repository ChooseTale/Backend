import { Module } from '@nestjs/common';
import { ImageService } from './domain/image.service';

import { ImageRepository } from './infrastructure/image.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { PageImageRepository } from '../page/infrastructure/repositories/page-image.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: 'IImageRepository',
      useClass: ImageRepository,
    },
    {
      provide: 'IPageImageRepository',
      useClass: PageImageRepository,
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
    {
      provide: 'IImageRepository',
      useClass: ImageRepository,
    },
    {
      provide: 'IPageImageRepository',
      useClass: PageImageRepository,
    },
  ],
})
export class ImageModule {}
