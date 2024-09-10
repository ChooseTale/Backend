import { ConflictException } from '@nestjs/common';
import { Game, Page, User, Image, PlayGame, UserChoice } from '@prisma/client';

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
      abridgement: string;
      content: string;
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
      abridgement: string;
    };
  };

  playGameDatas: {
    id: number | null;
    isEnded: boolean;
  }[];

  currentPlayGameData: {
    id: number;
    page: {
      id: number;
      abridgement: string;
      content: string;
      isEnding: boolean;
      isStarting: boolean;
    };
  } | null;

  userChoices: {
    id: number;
    choicePageId: number;
    playGameId: number;
  }[];

  constructor(
    game: Game,
    pages: Page[],
    producer: User,
    playGameDatas: PlayGame[],
    thumbnailImage: Image | null,
    userChoices: UserChoice[],
  ) {
    this.game = {
      id: game.id,
      title: game.title,
      description: game.description,
      genre: game.genre,
      thumbnailUrl: thumbnailImage?.url ?? '',
      updatedAt: game.updatedAt,
      pages: pages,
      producer: {
        userId: producer.id,
        nickname: '추가 예정',
        profileImageUrl: '추가 예정',
      },
      firstPage: pages.filter((page) => page.isStarting === true)[0],
    };
    this.playGameDatas = playGameDatas.map((play) => {
      return {
        id: play.id,
        isEnded: play.isEnded,
      };
    });
    this.userChoices = userChoices.map((userChoice) => {
      return {
        id: userChoice.id,
        choicePageId: userChoice.choicePageId,
        playGameId: userChoice.playGameId,
      };
    });
    this.getPlayGameData(playGameDatas, pages);
  }

  private getPlayGameData(play: PlayGame[], pages: Page[]) {
    const currentPlayGame = play.find((p) => p.isEnded === false);
    if (!currentPlayGame) {
      this.currentPlayGameData = null;
      return;
    }

    const currentPage = pages.find(
      (page) =>
        page.id ===
        this.userChoices
          .filter((choice) => choice.playGameId === currentPlayGame.id)
          .sort((a, b) => a.id - b.id)[0].choicePageId,
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
