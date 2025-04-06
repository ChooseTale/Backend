import { getImagePathOrNull } from '@@src/common/components/images/get-path.component';
import { User } from '@prisma/client';

export class MeEntity {
  id: number;
  email: string;
  nickname: string;
  profileImage: {
    url: string | null;
  };
  admin: {
    isMaster: boolean;
  };

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
    this.profileImage = { url: getImagePathOrNull(user.profileImageUrl) };
    this.admin = { isMaster: true };
  }
}
