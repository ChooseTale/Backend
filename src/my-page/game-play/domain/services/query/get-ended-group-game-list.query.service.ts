import { Genres, Prisma } from '@prisma/client';

export type EndedGroupGameInclude = {
  game: {
    include: {
      thumbnail: true;
      PlayGame: {
        where: {
          userId: number;
        };
        orderBy: {
          lastPlayedAt: 'desc';
        };
        distinct: ['gameId'];
        include: {
          UserChoice: {
            where: {
              choicePage: {
                toPage: {
                  isEnding: true;
                };
              };
            };
            include: {
              choicePage: {
                include: {
                  toPage: true;
                };
              };
            };
          };
        };
      };
      Page: {
        where: {
          isEnding: true;
        };
      };
    };
  };
};

export class GetEndedGroupGameListQueryService {
  private query: Prisma.PlayGameFindManyArgs;
  constructor(private readonly userId: number) {
    const include: EndedGroupGameInclude = {
      game: {
        include: {
          thumbnail: true,
          PlayGame: {
            distinct: ['gameId'],
            orderBy: {
              lastPlayedAt: 'desc',
            },
            where: {
              userId,
            },
            include: {
              UserChoice: {
                where: {
                  choicePage: {
                    toPage: {
                      isEnding: true,
                    },
                  },
                },
                include: {
                  choicePage: {
                    include: {
                      toPage: true,
                    },
                  },
                },
              },
            },
          },
          Page: {
            where: {
              isEnding: true,
            },
          },
        },
      },
    };
    this.query = {
      where: {
        userId,
        isEnded: true,
      },
      include,
      distinct: ['gameId'],
      orderBy: {
        lastPlayedAt: 'desc',
      },
    };
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
    } else {
      this.query.orderBy = {
        lastPlayedAt: 'asc',
      };
    }
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
