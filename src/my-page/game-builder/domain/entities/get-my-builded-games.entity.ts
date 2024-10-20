import { Prisma } from '@prisma/client';
import { GetMyBuildedGameInclude } from '../services/query/get-my-builded-game.query.service';
import config from '@@src/config';
import { ConflictException } from '@nestjs/common';

export class GetMyBuildedGamesEntity {
  list: {
    id: number;
    title: string;
    thumbnail: {
      url: string;
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
          url: config.apiHost + game.thumbnail?.url,
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
