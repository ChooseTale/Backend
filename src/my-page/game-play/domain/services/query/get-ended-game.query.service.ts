import { Genres, Prisma } from '@prisma/client';
import { ListParentQueryService } from './list-parent.query.service';

export type GetEndedGameInclude = {
  game: {
    include: {
      thumbnail: boolean;
    };
  };
  UserChoice: boolean;
};

export class GetEndedGameQueryService {
  private query: Prisma.PlayGameFindManyArgs<any>;
  constructor(userId: number) {
    const include: GetEndedGameInclude = {
      game: {
        include: {
          thumbnail: true,
        },
      },
      UserChoice: true,
    };
    this.query = {
      where: {
        userId,
        isEnded: true,
      },
      include,
    };
  }

  setPagenation(page: number, limit: number) {
    this.query.skip = (page - 1) * limit;
    this.query.take = limit;
  }

  setGenres(genres: (Genres | 'ALL')[]) {
    for (const genre of genres) {
      if (genre === 'ALL') {
        break;
      }
      if (this.query.where && this.query.where.OR) {
        this.query.where.OR.push({ game: { genre } });
      } else if (this.query.where) {
        this.query.where.OR = [{ game: { genre } }];
      }
    }
  }

  get getQuery() {
    return this.query;
  }
}
