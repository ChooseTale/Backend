import { Module } from '@nestjs/common';
import { PlayRepository } from './repositories/play.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'PlayGameRepository',
      useClass: PlayRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'PlayGameRepository',
      useClass: PlayRepository,
    },
  ],
})
export class PlayGameRepositoryModule {}
