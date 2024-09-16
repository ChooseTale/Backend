import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserRepositoryModule {}
