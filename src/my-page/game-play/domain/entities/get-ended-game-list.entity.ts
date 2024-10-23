import { Prisma } from '@prisma/client';
import { GetEndedGameInclude } from '../services/query/get-ended-game.query.service';
import { getImagePathOrNull } from '@@src/common/components/images/get-path.component';

export class GetEndedGameListEntity {
  list: {
    game: {
      id: number;
      title: string;
      thumbnail: {
        url: string | null;
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
            url: getImagePathOrNull(playGame.game.thumbnail?.url),
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
