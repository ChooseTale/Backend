import { User } from '@prisma/client';

export interface UserRepositoryPort {
  getUserByIdOrThrow(userId: number): Promise<User>;
}
