import { UserEntity } from '@@src/user/domain/entities/user.entity';

export interface UserComponentInterface {
  getUserEntityOrNull(email: string): Promise<UserEntity | null>;
  getNewNickname(givenName: string, familyName: string): Promise<string>;
  createUser(
    email: string,
    nickname: string,
    profileImageUrl: string,
  ): Promise<UserEntity>;
}
