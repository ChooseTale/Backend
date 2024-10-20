import { Page, Prisma } from '@prisma/client';
import { GetContinuedGameInclude } from '../services/query/get-continued-game.query.service';
import config from '@@src/config';
import { ConflictException } from '@nestjs/common';

export class GetContinuedGameListEntity {
  list: {
    game: {
      id: number;
      title: string;
      thumbnail: {
        url: string;
      };
      genre: string;
    };
    play: {
      id: number;
      createdAt: Date;
      page: {
        id: number;
        abridgement: string;
      };
    };
  }[];

  constructor(
    games: Prisma.GameGetPayload<{ include: GetContinuedGameInclude }>[],
  ) {
    this.list = games.map((game) => {
      if (game.PlayGame.length > 1) {
        throw new ConflictException('중복된 플레이 게임이 존재합니다.');
      }
      const play = game.PlayGame[0];

      const page = play.UserChoice.sort((a, b) => b.id - a.id)[0].choicePage
        .toPage;
      if (!page) {
        throw new ConflictException(
          '진행중인 게임의 다음 페이지가 존재하지 않음',
        );
      }
      return {
        game: {
          id: game.id,
          title: game.title,
          thumbnail: { url: config.apiHost + game.thumbnail?.url },
          genre: game.genre,
        },
        play: {
          id: play.id,
          createdAt: play.createdAt,
          page: {
            id: page.id,
            abridgement: page.abridgement,
          },
        },
      };
    });
  }
}
