import { Inject, Injectable } from '@nestjs/common';
import { GetContinuedGameQueryService } from '../services/query/get-continued-game.query.service';
import { GetContinuedGameListQueryDto } from '../../application/dto/req/get-continued-game-list.req.dto';
import { GetContinuedGameListComponent } from '../../components/get-list.component';

@Injectable()
export class GetContinuedGameUsecase {
  constructor(
    @Inject('GetContinuedGameListComponent')
    private readonly getContinuedGameListComponent: GetContinuedGameListComponent,
  ) {}

  async execute(
    userId: number,
    getCountinuedGameListQueryDto: GetContinuedGameListQueryDto,
  ) {
    const query = new GetContinuedGameQueryService(userId);
    query.setPagenation(
      getCountinuedGameListQueryDto.page,
      getCountinuedGameListQueryDto.limit,
    );
    query.setGenres(getCountinuedGameListQueryDto.genre);

    const games =
      await this.getContinuedGameListComponent.getContinuedGameListEntity(
        query.getQuery,
      );
    return games;
  }
}
