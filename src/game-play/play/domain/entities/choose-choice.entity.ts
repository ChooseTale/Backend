import { ChoicePage, Page } from '@prisma/client';

export class ChooseChoiceEntity {
  choiceId: number;
  currentPage: {
    id: number;
    isEnding: boolean;
  };
  toPage: {
    id: number;
    isEnding: boolean;
  };
  constructor(
    choice: ChoicePage,
    toPage: Page,
    currentPage: {
      id: number;
      isEnding: boolean;
    },
  ) {
    this.choiceId = choice.id;
    this.currentPage = {
      id: currentPage.id,
      isEnding: currentPage.isEnding,
    };
    this.toPage = {
      id: toPage.id,
      isEnding: toPage.isEnding,
    };
  }

  checkIsEnding(): boolean {
    return this.currentPage.isEnding;
  }
}
