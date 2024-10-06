import { Prisma } from '@prisma/client';
import { ListParentQueryService } from './list-parent.query.service';

export class GetCountQuery extends ListParentQueryService {
  constructor() {
    super({});
  }

  getCountQuery() {
    return this.query as Prisma.GameCountArgs;
  }
}
