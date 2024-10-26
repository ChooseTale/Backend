import { Injectable, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GoogleSocialLoginUsecase } from '../domain/usecases/google-social-login.usecase';
import { UserComponent } from '../components/user.component';
import { UserRepositoryModule } from '@@src/common/infrastructure/repositories/user/user.repository.module';
import { GetMeUsecase } from '../domain/usecases/get-me.usecase';
import { MulterModule } from '@nestjs/platform-express';
import config from '@@src/config';
import multer from 'multer';
import { UpdateUserUsecase } from '../domain/usecases/update-user.usecase';
import { DeleteUserUsecase } from '../domain/usecases/delete-user.usecase';

@Module({
  imports: [
    UserRepositoryModule,
    MulterModule.register({
      dest: config.files.userImage.dest,
      storage: multer.diskStorage({
        destination: config.files.userImage.dest,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.mimetype.split('/')[1],
          );
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    GoogleSocialLoginUsecase,
    GetMeUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
    {
      provide: 'UserComponent',
      useClass: UserComponent,
    },
  ],
})
export class UserModule {}
