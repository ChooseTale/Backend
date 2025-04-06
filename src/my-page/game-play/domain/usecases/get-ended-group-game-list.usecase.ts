import { Inject, Injectable } from '@nestjs/common';
import { GetGameListComponent } from '../../components/get-list.component';
import { GetEndedGroupGameListQueryDto } from '../../application/dto/req/get-ended-group-game-list.req.dto';
import { GetEndedGroupGameListQueryService } from '../services/query/get-ended-group-game-list.query.service';
import { toGetEndedGroupGameListResDto } from '../services/mapper/to-get-ended-group-game-list.mapper.service';

@Injectable()
export class GetEndedGroupGameListUsecase {
  constructor(
    @Inject('GetGameListComponent')
    private readonly getEndedGameListComponent: GetGameListComponent,
  ) {}

  async execute(userId: number, reqQuery: GetEndedGroupGameListQueryDto) {
    const query = new GetEndedGroupGameListQueryService(userId);
    query.setPagenation(reqQuery.page, reqQuery.limit);
    query.setGenres(reqQuery.genre);
    query.setOrder(reqQuery.order);
    const result =
      await this.getEndedGameListComponent.getEndedGroupGameListEntity(
        query.getQuery,
      );

    const countQuery = new GetEndedGroupGameListQueryService(userId);
    countQuery.setGenres(reqQuery.genre);
    const count =
      await this.getEndedGameListComponent.getEndedGroupGameListEntity(
        countQuery.getQuery,
      );

    return toGetEndedGroupGameListResDto(result, count.list.length);
  }
}
