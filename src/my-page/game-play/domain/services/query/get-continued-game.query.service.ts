import { Prisma } from '@prisma/client';
import { ListParentQueryService } from './list-parent.query.service';

export type GetContinuedGameInclude = {
  game: {
    include: {
      thumbnail: true;
    };
  };
  UserChoice: {
    include: {
      choicePage: {
        include: {
          toPage: true;
        };
      };
    };
  };
};

export class GetContinuedGameQueryService extends ListParentQueryService {
  constructor(userId: number) {
    const include: GetContinuedGameInclude = {
      game: {
        include: {
          thumbnail: true,
        },
      },
      UserChoice: {
        include: {
          choicePage: {
            include: {
              toPage: true,
            },
          },
        },
      },
    };
    super({
      include,
    });

    this.query.where = {
      userId,
      isEnded: false,
    };
  }

  setOrder(order: 'LATEST' | 'OLDEST') {
    const orderBy: Prisma.PlayGameOrderByWithRelationInput = {
      createdAt: order === 'LATEST' ? 'desc' : 'asc',
    };
    this.query.orderBy = orderBy;
  }
}
