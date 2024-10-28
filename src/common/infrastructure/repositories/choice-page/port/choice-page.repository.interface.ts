import { ChoicePage } from '@prisma/client';

export interface ChoicePageRepositoryPort {
  getOneByIdOrThrow(choicePageId: number): Promise<ChoicePage>;
  getAllByPageId(pageId: number): Promise<ChoicePage[]>;
  getAllByGameId(gameId: number): Promise<ChoicePage[]>;
  getChoicePageByIds(choicePageIds: number[]): Promise<ChoicePage[]>;
  getAllByFromPageIds(fromPageIds: number[]): Promise<ChoicePage[]>;
}
