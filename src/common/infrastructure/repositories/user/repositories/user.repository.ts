import { PrismaService } from '@@prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserRepositoryPort } from '../port/user.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByIdOrThrow(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return user;
  }

  async getUserByNickname(nickname: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { nickname } });
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const newUser = await this.prisma.user.create({ data: user });
    return newUser;
  }
}
