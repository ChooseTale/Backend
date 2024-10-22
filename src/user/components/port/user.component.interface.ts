import { UserEntity } from '@@src/user/domain/entities/user.entity';

export interface UserComponentInterface {
  getUserEntityOrNull(email: string): Promise<UserEntity | null>;
  getUserEntityByIdOrThrow(userId: number): Promise<UserEntity>;
  getNewNickname(givenName: string, familyName: string): Promise<string>;
  createUser(
    email: string,
    nickname: string,
    profileImageUrl: string,
  ): Promise<UserEntity>;
}
