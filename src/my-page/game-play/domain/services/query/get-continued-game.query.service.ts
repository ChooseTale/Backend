import { ListParentQueryService } from './list-parent.query.service';

export type GetContinuedGameInclude = {
  PlayGame: {
    where: {
      isEnded: false;
      userId: number;
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
          isEnded: false,
          userId,
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
  }
}
