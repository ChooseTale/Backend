import { Prisma } from '@prisma/client';
import { EndedGroupGameInclude } from '../services/query/get-ended-group-game-list.query.service';
import { ConflictException } from '@nestjs/common';
import { getImagePathOrNull } from '@@src/common/components/images/get-path.component';

export class GetEndedGroupGameListEntity {
  list: {
    game: {
      id: number;
      title: string;
      genre: string;
      totalEndingCount: number;
      thumbnailUrl: string | null;
    };
    author: {
      id: number;
      name: string;
    };
    endings: {
      playId: number;
      endingNumber: number;
      title: string;
      reachedEndingAt: Date;
    }[];
  }[];

  constructor(
    private readonly playGames: Prisma.PlayGameGetPayload<{
      include: EndedGroupGameInclude;
    }>[],
  ) {
    this.list = playGames.map((playGame) => {
      return {
        game: {
          id: playGame.game.id,
          title: playGame.game.title,
          genre: playGame.game.genre,
          totalEndingCount: playGame.game.Page.length,
          thumbnailUrl: getImagePathOrNull(playGame.game.thumbnail?.url),
        },
        author: {
          id: playGame.game.User.id,
          name: playGame.game.User.nickname,
        },
        endings: playGame.game.PlayGame.map((p) => {
          const endingPage = p.UserChoice[0].choicePage.toPage;

          if (!endingPage) {
            throw new ConflictException('endingPage is null');
          }

          return {
            playId: p.id,
            endingNumber:
              playGame.game.Page.findIndex(
                (page) => page.id === endingPage.id,
              ) + 1,
            title: endingPage.title,
            reachedEndingAt: p.lastPlayedAt,
          };
        }),
      };
    });
  }
}
