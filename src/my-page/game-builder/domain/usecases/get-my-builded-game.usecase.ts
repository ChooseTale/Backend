import { GetGameListComponent } from '@@src/my-page/game-play/components/get-list.component';
import { Inject, Injectable } from '@nestjs/common';
import { GetMyBuildedGamesQueryDto } from '../../application/dto/req/get-my-builded-game.req.dto';
import { GetMyBuildedGameQueryService } from '../services/query/get-my-builded-game.query.service';
import { toGetMyBuildedGameMapper } from '../services/mapper/to-get-my-builded-game.mapper';

@Injectable()
export class GetMyBuildedGameUsecase {
  constructor(
    @Inject('GetGameListComponent')
    private readonly getGameListComponent: GetGameListComponent,
  ) {}

  async execute(userId: number, reqQuery: GetMyBuildedGamesQueryDto) {
    const query = new GetMyBuildedGameQueryService(userId);
    query.setStatus(reqQuery.status);
    query.setOrder(reqQuery.order);
    query.setGenre(reqQuery.genre);
    query.setPagenation(reqQuery.page, reqQuery.limit);
    const games = await this.getGameListComponent.getMyBuildedGameListEntity(
      query.getQuery,
    );
    return toGetMyBuildedGameMapper(games);
  }
}
