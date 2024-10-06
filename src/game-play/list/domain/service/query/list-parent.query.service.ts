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

  setGenre(genre: Genres | 'ALL') {
    if (genre === 'ALL') {
      return this.query;
    }
    this.query.where = {
      genre: genre,
    };
    return this.query;
  }
}
