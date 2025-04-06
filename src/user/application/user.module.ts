import { Module, Logger } from '@nestjs/common';
import { UserController } from './user.controller';
import { GoogleSocialLoginUsecase } from '../domain/usecases/google-social-login.usecase';
import { UserComponent } from '../components/user.component';
import { UserRepositoryModule } from '@@src/common/infrastructure/repositories/user/user.repository.module';
import { GetMeUsecase } from '../domain/usecases/get-me.usecase';
import { MulterModule } from '@nestjs/platform-express';
import { UpdateUserUsecase } from '../domain/usecases/update-user.usecase';
import { DeleteUserUsecase } from '../domain/usecases/delete-user.usecase';
import { getS3Config, UploadS3Service } from '@@src/common/aws/upload-s3';
import config from '@@src/config';

@Module({
  imports: [
    UserRepositoryModule,
    MulterModule.registerAsync({
      useFactory: () => {
        const logger = new Logger('MulterModule');
        try {
          const s3Config = getS3Config(config.files.userImage.savePath);

          return s3Config;
        } catch (error) {
          logger.error(`S3 설정 로드 오류: ${error.message}`, error.stack);
          throw error;
        }
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    GoogleSocialLoginUsecase,
    GetMeUsecase,
    UpdateUserUsecase,
    DeleteUserUsecase,
    UploadS3Service,
    {
      provide: 'UserComponent',
      useClass: UserComponent,
    },
  ],
})
export class UserModule {}
