import { ChoicePage } from '@prisma/client';

export interface PageChoiceRepositoryPort {
  getAllByPageId(pageId: number): Promise<ChoicePage[]>;
  getOneByIdOrThrow(choiceId: number): Promise<ChoicePage>;
}
