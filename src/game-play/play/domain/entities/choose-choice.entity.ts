import { ChoicePage, Page } from '@prisma/client';

export class ChooseChoiceEntity {
  choiceId: number;
  toPage: {
    id: number;
    isEnding: boolean;
  };
  constructor(choice: ChoicePage, toPage: Page) {
    this.choiceId = choice.id;
    this.toPage = {
      id: toPage.id,
      isEnding: toPage.isEnding,
    };
  }

  checkIsEnding(): boolean {
    return this.toPage.isEnding;
  }
}
