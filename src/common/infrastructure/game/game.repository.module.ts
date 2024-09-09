import { Module } from '@nestjs/common';
import { GetGameRepository } from './repositories/get-game.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'GetGameRepository',
      useClass: GetGameRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'GetGameRepository',
      useClass: GetGameRepository,
    },
  ],
})
export class GameRepositoryModule {}
