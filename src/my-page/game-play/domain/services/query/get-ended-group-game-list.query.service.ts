import { Genres, Prisma } from '@prisma/client';
import { ListParentQueryService } from './list-parent.query.service';

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

export class GetEndedGroupGameListQueryService extends ListParentQueryService {
  query: Prisma.PlayGameFindManyArgs;
  constructor(private readonly userId: number) {
    super({});
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
        endingPageId: { not: null },
      },
      include,
      distinct: ['gameId'],
      orderBy: {
        lastPlayedAt: 'desc',
      },
    };
  }

  get getQuery() {
    return this.query;
  }
}
