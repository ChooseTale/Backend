import { Module } from '@nestjs/common';
import { ImageRepository } from './repository/image.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'ImageRepository',
      useClass: ImageRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'ImageRepository',
      useClass: ImageRepository,
    },
  ],
})
export class ImageRepositoryModule {}
