import { ChoicePage } from '@prisma/client';

export interface PageChoiceRepositoryPort {
  getAllByPageId(pageId: number): Promise<ChoicePage[]>;
}
