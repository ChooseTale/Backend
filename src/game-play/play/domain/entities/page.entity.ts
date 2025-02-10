import { getImagePathOrNull } from '@@src/common/components/images/get-path.component';
import { ChoicePage, Page, PageImage, Prisma } from '@prisma/client';

export class PlayPageEntity {
  id: number;
  contents: Prisma.JsonArray;
  title: string;
  backgroundImageUrl: string | null;
  choices: {
    id: number;
    title: string;
    childPageId: number | null;
  }[];
  isEnding: boolean;
  isStarting: boolean;

  constructor(page: Page, choices: ChoicePage[], pageImage?: PageImage) {
    this.id = page.id;
    this.contents = page.contents;
    this.title = page.title;
    this.backgroundImageUrl = getImagePathOrNull(pageImage?.url);
    this.choices = choices.map((choice) => ({
      id: choice.id,
      title: choice.title,
      childPageId: choice.toPageId,
    }));
    this.isEnding = page.isEnding;
    this.isStarting = page.isStarting;
  }
}
