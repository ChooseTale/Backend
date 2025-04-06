import { Genres, Prisma } from '@prisma/client';

export class ListParentQueryService {
  constructor(protected readonly query: Prisma.GameFindManyArgs) {
    this.query.where = {
      isPrivate: false,
    };
  }

  getQuery() {
    return this.query;
  }

  setGenre(genres: (Genres | 'ALL')[]) {
    for (const genre of genres) {
      if (genre === 'ALL') {
        continue;
      }
      if (this.query.where && this.query.where.OR) {
        this.query.where.OR.push({ genre: genre });
      } else if (this.query.where) {
        this.query.where.OR = [{ genre: genre }];
      }
    }
    return this.query;
  }
}
