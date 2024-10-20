import { Genres, Prisma } from '@prisma/client';

export class ListParentQueryService {
  constructor(protected readonly query: Prisma.GameFindManyArgs<any>) {}

  setGenres(genres: (Genres | 'ALL')[]) {
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
  }

  setPagenation(page: number, limit: number) {
    this.query.skip = (page - 1) * limit;
    this.query.take = limit;
  }

  get getQuery() {
    return this.query;
  }
}
