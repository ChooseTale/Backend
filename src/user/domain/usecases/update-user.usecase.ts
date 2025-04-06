import { UserComponent } from '@@src/user/components/user.component';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('UserComponent')
    private readonly userComponent: UserComponent,
  ) {}

  async execute(userId: number, body: any, image: any) {
    const user = await this.userComponent.getUserEntityByIdOrThrow(userId);

    const newNickname = await this.userComponent.getNewNickname(
      body.nickname,
      ``,
      userId,
    );

    user.updateNickname(newNickname);
    if (image) {
      user.updateProfileImageUrl(image.key);
    }
    await this.userComponent.updateByUserEntity(user);
    return user;
  }
}
