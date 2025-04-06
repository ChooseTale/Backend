import { UserComponent } from '@@src/user/components/user.component';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUsecase {
  constructor(
    @Inject('UserComponent')
    private readonly userComponent: UserComponent,
  ) {}

  async execute(userId: number) {
    const user = await this.userComponent.getUserEntityByIdOrThrow(userId);
    user.updateNickname(user.getNickname + '_deleted_' + new Date().getTime());
    user.updateEmail(user.getEmail + '_deleted_' + new Date().getTime());
    await this.userComponent.updateByUserEntity(user);
    await this.userComponent.deleteUser(userId);
  }
}
