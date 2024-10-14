import { User } from '@prisma/client';

export class MeEntity {
  id: number;
  email: string;
  nickname: string;
  profileImage: {
    url: string;
  };
  admin: {
    isMaster: boolean;
  };

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
    this.profileImage = { url: user.profileImageUrl };
    this.admin = { isMaster: true };
  }
}
