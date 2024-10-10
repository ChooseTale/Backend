import { Injectable, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GoogleSocialLoginUsecase } from '../domain/usecases/google-social-login.usecase';
import { UserComponent } from '../components/user.component';
import { UserRepositoryModule } from '@@src/common/infrastructure/repositories/user/user.repository.module';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [
    GoogleSocialLoginUsecase,
    {
      provide: 'UserComponent',
      useClass: UserComponent,
    },
  ],
})
export class UserModule {}
