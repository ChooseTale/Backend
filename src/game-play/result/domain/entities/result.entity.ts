import { PageChoice } from '@@src/game-builder/choice/domain/entities/page-choice.entity';
import { ChoicePage, Page, UserChoice } from '@prisma/client';

export class GamePlayResultEntity {
  public gameId: number;
  public totalPlayCount: number;
  public totalEndingCount: number;
  public reachEndingCount: number;
  public readonly endingPage: {
    id: number;
    title: string;
  };
  public readonly choosenPages: {
    id: number;
    title: string;
    choices: {
      id: number;
      title: string;
      percentage: number;
      isSelected: boolean;
    }[];
  }[];

  public setGameId(gameId: number) {
    this.gameId = gameId;
  }

  public setTotalPlayCount(totalPlayCount: number) {
    this.totalPlayCount = totalPlayCount;
  }

  public setTotalEndingCount(totalEndingCount: number) {
    this.totalEndingCount = totalEndingCount;
  }

  public setReachEndingCount(reachEndingCount: number) {
    this.reachEndingCount = reachEndingCount;
  }

  constructor(
    pages: Page[],
    choicePageToUserChoice: ChoicePage[],
    allUserChoices: UserChoice[],
    userChoices: UserChoice[],
    choicePagesEqualFromPage: ChoicePage[],
  ) {
    const endingPage = pages.find(
      (page) =>
        page.isEnding &&
        choicePageToUserChoice.some((choice) => choice.toPageId === page.id),
    );

    if (!endingPage) {
      throw new Error('Ending page not found');
    }

    this.endingPage = {
      id: endingPage.id,
      title: endingPage.title,
    };

    this.choosenPages = userChoices
      .sort((a, b) => a.id - b.id)
      .map((userChoice) => {
        const chooseChoice = choicePagesEqualFromPage.find(
          (choice) => choice.id === userChoice.choicePageId,
        );
        const page = pages.find((page) => page.id === chooseChoice?.fromPageId);
        if (!page) {
          throw new Error('Page not found');
        }
        const equalFromPageChoices = choicePagesEqualFromPage.filter(
          (choice) => choice.fromPageId === chooseChoice?.fromPageId,
        );
        const equalFromPageChoicesIds = equalFromPageChoices.map(
          (choice) => choice.id,
        );

        const allUserChoicesCount = allUserChoices.filter((choice) =>
          equalFromPageChoicesIds.includes(choice.choicePageId),
        ).length;

        // console.log(allUserChoicesCount);
        const choices: {
          id: number;
          title: string;
          percentage: number;
          isSelected: boolean;
        }[] = [];
        for (const equalFromPageChoice of equalFromPageChoices) {
          const userChoicesCount = allUserChoices.filter(
            (choice) => choice.choicePageId === equalFromPageChoice.id,
          ).length;

          const percentage = userChoicesCount / allUserChoicesCount;
          choices.push({
            id: equalFromPageChoice.id,
            title: equalFromPageChoice.title,
            percentage: percentage,
            isSelected: userChoice.choicePageId === equalFromPageChoice.id,
          });
        }

        return {
          id: page.id,
          title: page?.title,
          choices: choices,
        };
      });
  }
}
