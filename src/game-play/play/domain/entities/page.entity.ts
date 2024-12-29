import { ChoicePage, Page } from '@prisma/client';

export class PlayPageEntity {
  id: number;
  content: string;
  title: string;
  choices: {
    id: number;
    title: string;
    description: string;
    childPageId: number | null;
  }[];
  isEnding: boolean;
  isStarting: boolean;

  constructor(page: Page, choices: ChoicePage[]) {
    this.id = page.id;
    this.content = page.content;
    this.title = page.title;
    this.choices = choices.map((choice) => ({
      id: choice.id,
      title: choice.title,
      description: choice.description,
      childPageId: choice.toPageId,
    }));
    this.isEnding = page.isEnding;
    this.isStarting = page.isStarting;
  }
}
