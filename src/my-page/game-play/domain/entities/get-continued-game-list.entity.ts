import { Prisma } from '@prisma/client';
import { GetContinuedGameInclude } from '../services/query/get-continued-game.query.service';
import { ConflictException } from '@nestjs/common';
import { getImagePathOrNull } from '@@src/common/components/images/get-path.component';

export class GetContinuedGameListEntity {
  list: {
    game: {
      id: number;
      title: string;
      thumbnail: {
        url: string | null;
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
    playGames: Prisma.PlayGameGetPayload<{
      include: GetContinuedGameInclude;
    }>[],
  ) {
    this.list = playGames.map((playGame) => {
      const page = playGame.UserChoice.sort((a, b) => b.id - a.id)[0]
        .choicePage;

      if (!page.toPage) {
        throw new ConflictException(
          '진행중인 게임의 다음 페이지가 존재하지 않음',
        );
      }
      return {
        game: {
          id: playGame.game.id,
          title: playGame.game.title,
          thumbnail: { url: getImagePathOrNull(playGame.game.thumbnail?.url) },
          genre: playGame.game.genre,
        },
        play: {
          id: playGame.id,
          createdAt: playGame.createdAt,
          page: {
            id: page.id,
            abridgement: page.toPage.abridgement,
          },
        },
      };
    });
  }
}
