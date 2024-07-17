import { Module } from '@nestjs/common';
import { PageController } from './controllers/page.controller';
import { PageService } from '../domain/page.service';
import { PageRepository } from '../infrastructure/repositories/page.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { CreatePageUsecase } from './usecases/create-page.usecase';

@Module({
  controllers: [PageController],
  providers: [
    CreatePageUsecase,
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
