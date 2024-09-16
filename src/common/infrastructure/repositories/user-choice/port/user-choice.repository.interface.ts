import { UserChoice } from '@prisma/client';

export interface UserChoiceRepositoryPort {
  getAllByPlayId(playGameId: number): Promise<UserChoice[]>;
  getAllByPlayIds(playGameIds: number[]): Promise<UserChoice[]>;
  create(playGameId: number, pageId: number): Promise<UserChoice>;
}
