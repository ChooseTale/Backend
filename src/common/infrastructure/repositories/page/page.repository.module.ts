import { Module } from '@nestjs/common';
import { PageRepository } from './repository/page.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'PageRepository',
      useClass: PageRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'PageRepository',
      useClass: PageRepository,
    },
  ],
})
export class PageRepositoryModule {}
