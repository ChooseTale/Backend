import { Module } from '@nestjs/common';
import { UserChoiceRepository } from './repositories/user-choice.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'UserChoiceRepository',
      useClass: UserChoiceRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'UserChoiceRepository',
      useClass: UserChoiceRepository,
    },
  ],
})
export class UserChoiceModule {}
