import { UserRepositoryPort } from '@@src/common/infrastructure/repositories/user/port/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { MeEntity } from '../domain/entities/me.entity';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserComponent {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async getMeEntity(userId: number): Promise<MeEntity> {
    const user = await this.userRepository.getUserByIdOrThrow(userId);
    return new MeEntity(user);
  }

  async getUserEntityByIdOrThrow(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.getUserByIdOrThrow(userId);
    return new UserEntity(user);
  }

  async getUserEntityOrNull(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.getUserByEmail(email);
    return user ? new UserEntity(user) : null;
  }

  // 중복된 닉네임이 있으면 랜덤한 숫자를 붙임
  async getNewNickname(givenName: string, familyName: string): Promise<string> {
    const user = await this.userRepository.getUserByNickname(
      `${givenName}${familyName}`,
    );
    if (user) {
      return `${givenName}${familyName}#${Math.floor(Math.random() * 1000)}`;
    }
    return `${givenName}${familyName}`;
  }

  async createUser(
    email: string,
    nickname: string,
    profileImageUrl: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.createUser({
      email,
      nickname,
      profileImageUrl,
    });
    return new UserEntity(user);
  }

  async updateByUserEntity(user: UserEntity): Promise<UserEntity> {
    const dbUser: Prisma.UserUpdateInput = {
      email: user.email,
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
    };
    console.log(dbUser);
    const updatedUser = await this.userRepository.updateUser(user.id, dbUser);
    return new UserEntity(updatedUser);
  }
}
