import { ListParentQueryService } from './list-parent.query.service';

export type GetContinuedGameInclude = {
  PlayGame: {
    where: {
      userId: number;
      isEnded: false;
    };
    include: {
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
  };

  thumbnail: true;
};

export class GetContinuedGameQueryService extends ListParentQueryService {
  constructor(userId: number) {
    const include: GetContinuedGameInclude = {
      PlayGame: {
        where: {
          userId,
          isEnded: false,
        },
        include: {
          UserChoice: {
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
      thumbnail: true,
    };
    super({
      include,
    });

    this.query.where = {
      PlayGame: {
        some: {
          userId,
          isEnded: false,
        },
      },
    };
  }
}
