import { getImagePath } from '@@src/common/components/images/get-path.component';
import { ConflictException } from '@nestjs/common';
import {
  Game,
  Page,
  User,
  Image,
  PlayGame,
  UserChoice,
  ChoicePage,
  Prisma,
} from '@prisma/client';

export class IntroEntity {
  game: {
    id: number;
    title: string;
    description: string;
    genre: string;
    thumbnailUrl: string;
    updatedAt: Date;
    pages: {
      id: number;
      title: string;
      contents: Prisma.JsonArray;
      isEnding: boolean;
      isStarting: boolean;
    }[];
    producer: {
      userId: number;
      nickname: string;
      profileImageUrl: string;
    };
    firstPage: {
      id: number;
      title: string;
    };
  };

  playGameDatas: {
    id: number | null;
    endingPageId: number | null;
  }[];

  currentPlayGameData: {
    id: number;
    page: {
      id: number;
      title: string;
      contents: Prisma.JsonArray;
      isEnding: boolean;
      isStarting: boolean;
    };
  } | null;

  userChoices: {
    id: number;
    choicePageId: number;
    playGameId: number;
  }[];

  choicePages: {
    id: number;
    fromPageId: number;
    toPageId: number | null;
  }[];

  getThumbnailUrl(thumbnailUrl: Image | null) {
    if (!thumbnailUrl) {
      return '';
    }
    return getImagePath(thumbnailUrl.url);
  }

  constructor(
    game: Game,
    pages: Page[],
    producer: User,
    playGameDatas: PlayGame[],
    thumbnailImage: Image | null,
    userChoices: UserChoice[],
    choicePages: ChoicePage[],
  ) {
    this.game = {
      id: game.id,
      title: game.title,
      description: game.description,
      genre: game.genre,
      thumbnailUrl: this.getThumbnailUrl(thumbnailImage),
      updatedAt: game.updatedAt,
      pages: pages,
      producer: {
        userId: producer.id,
        nickname: producer.nickname,
        profileImageUrl: producer.profileImageUrl,
      },
      firstPage: pages.filter((page) => page.isStarting === true)[0],
    };
    this.playGameDatas = playGameDatas.map((play) => {
      return {
        id: play.id,
        endingPageId: play.endingPageId,
      };
    });
    this.userChoices = userChoices.map((userChoice) => {
      return {
        id: userChoice.id,
        choicePageId: userChoice.choicePageId,

        playGameId: userChoice.playGameId,
      };
    });
    this.choicePages = choicePages.map((choicePage) => {
      return {
        id: choicePage.id,
        fromPageId: choicePage.fromPageId,
        toPageId: choicePage.toPageId,
      };
    });
    this.getPlayGameData(playGameDatas, pages);
  }

  private getPlayGameData(play: PlayGame[], pages: Page[]) {
    const currentPlayGame = play.find((p) => p.endingPageId === null);
    if (!currentPlayGame) {
      this.currentPlayGameData = null;
      return;
    }

    // console.log(currentPlayGame);

    const currentGameChoices = this.userChoices.filter(
      (choice) => choice.playGameId === currentPlayGame.id,
    );

    // 진행 데이터가 없다면 첫 페이지를 반환한다.
    if (currentGameChoices.length === 0) {
      const firstPage = pages.find((page) => page.isStarting === true);
      if (!firstPage) {
        throw new ConflictException('첫 페이지를 찾을 수 없습니다.');
      }
      this.currentPlayGameData = {
        id: currentPlayGame.id,
        page: firstPage,
      };
      return;
    }

    const currentPlayGameFromPageId = this.choicePages.find(
      (choicePage) =>
        choicePage.id ===
        currentGameChoices.sort((a, b) => b.id - a.id)[0].choicePageId,
    )?.toPageId;

    const currentPage = pages.find(
      (page) => page.id === currentPlayGameFromPageId,
    );

    if (!currentPage) {
      throw new ConflictException('현재 페이지를 찾을 수 없습니다.');
    }
    this.currentPlayGameData = {
      id: currentPlayGame.id,
      page: currentPage,
    };
  }
}
