import { Module } from '@nestjs/common';
import { PageChoiceRepository } from './page-choice.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'PageChoiceRepository',
      useClass: PageChoiceRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'PageChoiceRepository',
      useClass: PageChoiceRepository,
    },
  ],
})
export class PageChoiceRepositoryModule {}
