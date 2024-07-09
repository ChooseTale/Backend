import { Module } from '@nestjs/common';
import { PageController } from './controllers/page.controller';
import { PageService } from './services/page.service';
import { PageRepository } from './infrastructure/repositories/page.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  controllers: [PageController],
  providers: [
    {
      provide: 'IPageService',
      useClass: PageService,
    },
    {
      provide: 'IPageRepository',
      useClass: PageRepository,
    },
    PrismaService,
  ],
  exports: [{ provide: 'IPageService', useClass: PageService }],
})
export class PageModule {}
