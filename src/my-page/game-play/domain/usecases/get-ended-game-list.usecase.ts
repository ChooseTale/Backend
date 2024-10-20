import { Inject, Injectable } from '@nestjs/common';
import { GetEndedGameListQueryDto } from '../../application/dto/req/get-ended-game-list.req.dto';
import { GetEndedGameQueryService } from '../services/query/get-ended-game.query.service';
import { GetGameListComponent } from '../../components/get-list.component';
import { toGetEndedGameListResDto } from '../services/mapper/to-get-ended-game-list.mapper';

@Injectable()
export class GetEndedGameListUsecase {
  constructor(
    @Inject('GetGameListComponent')
    private readonly getGameListComponent: GetGameListComponent,
  ) {}

  async execute(userId: number, reqQuery: GetEndedGameListQueryDto) {
    const queryService = new GetEndedGameQueryService(userId);
    queryService.setPagenation(reqQuery.page, reqQuery.limit);
    queryService.setGenres(reqQuery.genre);

    const games = await this.getGameListComponent.getEndedGameListEntity(
      queryService.getQuery,
    );
    return toGetEndedGameListResDto(games);
  }
}
