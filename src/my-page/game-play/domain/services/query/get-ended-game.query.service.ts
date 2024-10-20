import { Genres, Prisma } from '@prisma/client';
import { ListParentQueryService } from './list-parent.query.service';

export type GetEndedGameInclude = {
  game: {
    include: {
      thumbnail: boolean;
    };
  };
  UserChoice: boolean;
};

export class GetEndedGameQueryService extends ListParentQueryService {
  query: Prisma.PlayGameFindManyArgs<any>;
  constructor(userId: number) {
    super({});
    const include: GetEndedGameInclude = {
      game: {
        include: {
          thumbnail: true,
        },
      },
      UserChoice: true,
    };
    this.query = {
      where: {
        userId,
        isEnded: true,
      },
      include,
    };
  }

  get getQuery() {
    return this.query;
  }
}