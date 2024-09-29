import { Module } from '@nestjs/common';
import { ChoicePageRepository } from './choice-page.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'ChoicePageRepository', useClass: ChoicePageRepository },
  ],
  exports: [
    {
      provide: 'ChoicePageRepository',
      useClass: ChoicePageRepository,
    },
  ],
})
export class ChoicePageRepositoryModule {}
