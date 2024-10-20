import { Prisma } from '@prisma/client';
import { GetEndedGameInclude } from '../services/query/get-ended-game.query.service';
import config from '@@src/config';

export class GetEndedGameListEntity {
  list: {
    game: {
      id: number;
      title: string;
      thumbnail: {
        url: string;
      };
      genre: string;
      reachedEndingAt: Date;
      ending: {
        playId: number;
      };
    };
  }[];

  constructor(
    playGames: Prisma.PlayGameGetPayload<{ include: GetEndedGameInclude }>[],
  ) {
    this.list = playGames.map((playGame) => {
      return {
        game: {
          id: playGame.game.id,
          title: playGame.game.title,
          thumbnail: {
            url: config.apiHost + playGame.game.thumbnail?.url,
          },
          genre: playGame.game.genre,
          reachedEndingAt: playGame.UserChoice.sort((a, b) => a.id - b.id)[0]
            .createdAt,
          ending: {
            playId: playGame.id,
          },
        },
      };
    });
  }
}
