import { Genres, Prisma } from '@prisma/client';

export type GetMyBuildedGameInclude = {
  Page: {
    where: {
      deletedAt: null;
    };
  };
  thumbnail: true;
  ChoicePage: {
    where: {
      deletedAt: null;
    };
  };
  PlayGame: {
    where: {
      deletedAt: null;
    };
  };
};

export class GetMyBuildedGameQueryService {
  private query: Prisma.GameFindManyArgs = { where: {}, include: {} };
  constructor(userId: number) {
    const include: GetMyBuildedGameInclude = {
      Page: {
        where: {
          deletedAt: null,
        },
      },
      thumbnail: true,
      ChoicePage: {
        where: {
          deletedAt: null,
        },
      },
      PlayGame: {
        where: { deletedAt: null },
      },
    };
    this.query.where = {
      userId,
    };
    this.query.include = include;
  }

  setOrder(order: 'LATEST' | 'OLDEST' | 'POPULAR') {
    switch (order) {
      case 'LATEST':
        this.query.orderBy = { id: 'desc' };
        break;
      case 'OLDEST':
        this.query.orderBy = { id: 'asc' };
        break;
      case 'POPULAR':
        this.query.orderBy = { PlayGame: { _count: 'desc' } };
        break;
      default:
        throw new Error('Invalid order');
    }
  }

  setGenre(genre: (Genres | 'ALL')[]) {
    for (const g of genre) {
      if (g === 'ALL') {
        continue;
      }
      if (this.query.where && this.query.where.OR) {
        this.query.where.OR.push({ genre: g });
      } else if (this.query.where) {
        this.query.where.OR = [{ genre: g }];
      }
    }
  }

  setPagenation(page: number, limit: number) {
    this.query.skip = (page - 1) * limit;
    this.query.take = limit;
  }

  setStatus(status: 'PUBLISHED' | 'BUILDING' | 'ALL') {
    if (status === 'ALL') {
      return;
    }
    this.query.where = {
      ...this.query.where,
      isPrivate: status === 'BUILDING',
    };
  }

  get getQuery() {
    return this.query;
  }
}
