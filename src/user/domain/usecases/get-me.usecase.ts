import { UserRepositoryPort } from '@@src/common/infrastructure/repositories/user/port/user.repository.interface';
import { UserComponent } from '@@src/user/components/user.component';
import { Inject, Injectable } from '@nestjs/common';
import { MeEntity } from '../entities/me.entity';
import { MeResDto } from '@@src/user/application/dto/me.res.dto';

@Injectable()
export class GetMeUsecase {
  constructor(
    @Inject('UserComponent')
    private readonly userComponent: UserComponent,
  ) {}

  async execute(userId: number): Promise<MeResDto> {
    const meEntity = await this.userComponent.getMeEntity(userId);
    return {
      id: meEntity.id,
      email: meEntity.email,
      nickname: meEntity.nickname,
      profileImage: meEntity.profileImage,
      admin: meEntity.admin,
    };
  }
}
