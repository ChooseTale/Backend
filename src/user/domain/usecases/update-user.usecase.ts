import config from '@@src/config';
import { UserComponent } from '@@src/user/components/user.component';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('UserComponent')
    private readonly userComponent: UserComponent,
  ) {}

  async execute(userId: number, body: any, image: Express.Multer.File) {
    const profileImageUrl = '/' + image.path;
    const user = await this.userComponent.getUserEntityByIdOrThrow(userId);
    user.updateNickname(body.nickname);
    user.updateProfileImageUrl(profileImageUrl);
    await this.userComponent.updateByUserEntity(user);
  }
}
