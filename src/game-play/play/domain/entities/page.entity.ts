import { ChoicePage, Page } from '@prisma/client';

export class PlayPageEntity {
  id: number;
  content: string;
  abridgement: string;
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
    this.abridgement = page.abridgement;
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
