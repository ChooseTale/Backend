import { ConflictException } from '@nestjs/common';
import { ChoicePage, Game, Page, UserChoice } from '@prisma/client';

export class GetPlayGameResultEntity {
  endingPage: {
    id: number;
    title: string;
  };
  choosenPages: {
    id: number;
    title: string;
    choices: {
      id: number;
      title: string;
      percentage: number;
    }[];
  }[] = [];

  constructor(
    game: Game,
    pages: Page[],
    choicePages: ChoicePage[],
    userChoices: UserChoice[],
  ) {
    const endingPages = pages.filter((page) => page.isEnding);
    this.endingPage =
      endingPages[Math.floor(Math.random() * endingPages.length)];

    const startPage = pages.find((page) => page.isStarting);
    if (!startPage) {
      throw new ConflictException('시작 페이지가 없습니다.');
    }

    const dfs = (page: Page) => {
      if (page.isEnding) {
        return;
      }
      const cp = choicePages.filter(
        (choicePage) => choicePage.fromPageId === page.id,
      );
      // 각 선택지의 퍼센테이지를 계산
      const uc = userChoices.filter((userChoice) =>
        cp.some((cp) => cp.id === userChoice.choicePageId),
      );
      const choices = cp.map((cp) => {
        const ucCount = uc.filter((uc) => uc.choicePageId === cp.id).length;

        const percentage = uc.length === 0 ? 0 : ucCount / uc.length;
        return {
          id: cp.id,
          title: cp.title,
          percentage,
        };
      });

      this.choosenPages.push({
        id: page.id,
        title: page.title,
        choices,
      });
      for (const c of cp) {
        const toPage = pages.find((p) => p.id === c.toPageId);
        if (toPage) {
          dfs(toPage);
        }
      }
    };
    dfs(startPage);
  }
}
