import { Prisma } from '@prisma/client';
import { GetMyBuildedGameInclude } from '../services/query/get-my-builded-game.query.service';

import { ConflictException } from '@nestjs/common';
import { getImagePathOrNull } from '@@src/common/components/images/get-path.component';

export class GetMyBuildedGamesEntity {
  list: {
    id: number;
    title: string;
    thumbnail: {
      url: string | null;
    };
    firstPageAbridgement: string;
    genre: string;
    createdAt: Date;
    updatedAt: Date;
    count: {
      endingCount: number;
      choiceCount: number;
      pageCount: number;
      reachEndingPlayerCount: number | null;
    };
  }[];

  constructor(
    games: Prisma.GameGetPayload<{ include: GetMyBuildedGameInclude }>[],
  ) {
    this.list = games.map((game) => {
      const startingPage = game.Page.find((page) => page.isStarting);
      if (!startingPage) {
        throw new ConflictException('Starting page not found');
      }
      return {
        id: game.id,
        title: game.title,
        thumbnail: {
          url: getImagePathOrNull(game.thumbnail?.url),
        },
        firstPageAbridgement: startingPage.abridgement,
        genre: game.genre,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        count: {
          endingCount: game.Page.filter((p) => p.isEnding).length,
          choiceCount: game.ChoicePage.length,
          pageCount: game.Page.length,
          reachEndingPlayerCount: game.PlayGame.length,
        },
      };
    });
  }
}
