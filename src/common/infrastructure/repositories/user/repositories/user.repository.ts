import { PrismaService } from '@@prisma/prisma.service';
import { User } from '@prisma/client';
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
}
