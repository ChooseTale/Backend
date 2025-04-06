import { Genres, Prisma } from '@prisma/client';

export class ListParentQueryService {
  constructor(protected readonly query: Prisma.PlayGameFindManyArgs<any>) {}

  setGenres(genres: (Genres | 'ALL')[]) {
    for (const genre of genres) {
      if (genre === 'ALL') {
        continue;
      }
      if (this.query.where && this.query.where.OR) {
        this.query.where.OR.push({ game: { genre } });
      } else if (this.query.where) {
        this.query.where.OR = [{ game: { genre } }];
      }
    }
  }

  setPagenation(page: number, limit: number) {
    this.query.skip = (page - 1) * limit;
    this.query.take = limit;
  }

  setOrder(order: 'LATEST' | 'OLDEST') {
    if (order === 'LATEST') {
      this.query.orderBy = {
        lastPlayedAt: 'desc',
      };
    }
    if (order === 'OLDEST') {
      this.query.orderBy = {
        lastPlayedAt: 'asc',
      };
    }
  }

  get getQuery() {
    return this.query;
  }
}
