import { Prisma, User } from '@prisma/client';

export interface UserRepositoryPort {
  createUser(user: Prisma.UserCreateInput): Promise<User>;
  getUserByNickname(nickname: string): Promise<User | null>;
  getUserByIdOrThrow(userId: number): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}
