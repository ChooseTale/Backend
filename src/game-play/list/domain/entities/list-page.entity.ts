import { Game, Page, PlayGame, Prisma, User } from '@prisma/client';

export type GameGetPayload = Prisma.GameGetPayload<{
  include: {
    User: true;
    PlayGame: {
      include: {
        user: true;
      };
    };
    Page: true;
    thumbnail: true;
  };
}>;

export class ListPageEntity {
  list: {
    game: {
      id: number;
      title: string;
      thumbnail: {
        id: number;
        url: string;
      } | null;
      genre: string;
      createdAt: Date;
      updatedAt: Date;
      pages: {
        id: number;
        isEnding: boolean;
      }[];
      playGame: {
        id: number;
        isEnded: boolean;

        user: {
          id: number;
          nickname: string;
          profileImage: {
            url: string;
          };
        };
      }[];
    };
    publisher: {
      userId: number;
      nickname: string;
      profileImage: {
        url: string;
      };
    };
    enrichData: {
      totalEndingCount: number;
      totalRechedEndingPlayCount: number;
      expectPlayTime: number;
      // me: {
      //   isExistReachedEndingPlay: boolean;
      //   reachedEndingPlayCount: number;
      //   isExistContinuePlay: boolean;
      // };
    };
  }[];

  constructor(gameDbDatas: GameGetPayload[]) {
    this.list = gameDbDatas.map((game) => {
      return {
        game: {
          id: game.id,
          title: game.title,
          thumbnail: game.thumbnail
            ? {
                id: game.thumbnail.id,
                url: game.thumbnail.url,
              }
            : null,
          genre: game.genre,
          pages: game.Page.map((page) => {
            return {
              id: page.id,
              isEnding: page.isEnding,
            };
          }),
          playGame: game.PlayGame.map((playGame) => {
            return {
              id: playGame.id,
              isEnded: playGame.isEnded,

              user: {
                id: playGame.user.id,
                nickname: playGame.user.nickname,
                profileImage: {
                  url: playGame.user.profileImageUrl,
                },
              },
            };
          }),
          createdAt: game.createdAt,
          updatedAt: game.updatedAt,
        },
        publisher: {
          userId: game.User.id,
          nickname: game.User.nickname,
          profileImage: {
            url: game.User.profileImageUrl,
          },
        },
        enrichData: {
          totalEndingCount: this.getTotalEndingCount(game.Page),
          totalRechedEndingPlayCount: this.getTotalRechedEndingPlayCount(
            game.PlayGame,
          ),
          expectPlayTime: 0,
          me: {
            isExistReachedEndingPlay: false,
            reachedEndingPlayCount: 0,
            isExistContinuePlay: false,
          },
        },
      };
    });
  }

  public getTotalEndingCount(pages: Page[]) {
    return pages.filter((page) => page.isEnding).length;
  }

  public getTotalRechedEndingPlayCount(playGames: PlayGame[]) {
    return playGames.filter((playGame) => playGame.isEnded).length;
  }

  // public getMeData(playGames: PlayGame[], userId: number) {
  //   const mePlayGames = playGames.filter(
  //     (playGame) => playGame.userId === userId,
  //   );
  //   return {
  //     isExistReachedEndingPlay: mePlayGames.some(
  //       (playGame) => playGame.isEnded,
  //     ),
  //     reachedEndingPlayCount: mePlayGames.filter((playGame) => playGame.isEnded)
  //       .length,
  //     isExistContinuePlay: mePlayGames
  //       .filter((playGame) => !playGame.isEnded)
  //       .some((playGame) => !playGame.isEnded),
  //   };
  // }
}
