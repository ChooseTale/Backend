import { Genres, Prisma } from '@prisma/client';
import { ListParentQueryService } from './list-parent.query.service';

export type EndedGroupGameInclude = {
  game: {
    include: {
      thumbnail: true;
      User: true;
      PlayGame: {
        where: {
          deletedAt: null;
          userId: number;
          endingPageId: { not: null };
        };
        orderBy: {
          lastPlayedAt: 'desc';
        };
        distinct: ['endingPageId'];
        include: {
          UserChoice: {
            where: {
              deletedAt: null;
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
          deletedAt: null;
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
          User: true,
          PlayGame: {
            distinct: ['endingPageId'],
            orderBy: {
              lastPlayedAt: 'desc',
            },
            where: {
              deletedAt: null,
              endingPageId: { not: null },
              userId,
            },
            include: {
              UserChoice: {
                where: {
                  deletedAt: null,
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
              deletedAt: null,
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
