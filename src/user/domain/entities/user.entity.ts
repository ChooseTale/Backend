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

  get getNickname() {
    return this.nickname;
  }

  get getEmail() {
    return this.email;
  }

  updateEmail(email: string) {
    this.email = email;
  }

  updateNickname(nickname: string) {
    this.nickname = nickname;
  }

  updateProfileImageUrl(multerImagePath: string) {
    this.profileImageUrl = multerImagePath;
  }
}
