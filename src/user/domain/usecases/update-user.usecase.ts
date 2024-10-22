import { UserComponent } from '@@src/user/components/user.component';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject('UserComponent')
    private readonly userComponent: UserComponent,
  ) {}

  async execute(userId: number, body: any, image: Express.Multer.File) {
    const user = await this.userComponent.getUserEntityByIdOrThrow(userId);

    const newNickname = await this.userComponent.getNewNickname(
      body.nickname,
      ``,
      userId,
    );

    user.updateNickname(newNickname);
    user.updateProfileImageUrl(image.path);
    await this.userComponent.updateByUserEntity(user);
    return user;
  }
}
