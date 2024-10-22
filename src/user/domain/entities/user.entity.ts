import { User } from '@prisma/client';

export class UserEntity {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
    this.profileImageUrl = user.profileImageUrl;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  updateNickname(nickname: string) {
    this.nickname = nickname;
  }

  updateProfileImageUrl(profileImageUrl: string) {
    this.profileImageUrl = profileImageUrl;
  }
}
