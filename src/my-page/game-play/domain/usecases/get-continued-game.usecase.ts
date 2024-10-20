import { Inject, Injectable } from '@nestjs/common';
import { GetContinuedGameQueryService } from '../services/query/get-continued-game.query.service';
import { GetContinuedGameListQueryDto } from '../../application/dto/req/get-continued-game-list.req.dto';
import { GetGameListComponent } from '../../components/get-list.component';
import { toGetContinuedGameListResDto } from '../services/mapper/to-get-countinued-game-list.mapper.service';

@Injectable()
export class GetContinuedGameUsecase {
  constructor(
    @Inject('GetGameListComponent')
    private readonly getContinuedGameListComponent: GetGameListComponent,
  ) {}

  async execute(userId: number, reqQuery: GetContinuedGameListQueryDto) {
    const query = new GetContinuedGameQueryService(userId);
    query.setPagenation(reqQuery.page, reqQuery.limit);
    query.setGenres(reqQuery.genre);
    query.setOrder(reqQuery.order);

    const games =
      await this.getContinuedGameListComponent.getContinuedGameListEntity(
        query.getQuery,
      );
    return toGetContinuedGameListResDto(games);
  }
}
