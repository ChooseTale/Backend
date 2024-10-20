import { GetGameRepositoryPort } from '@@src/common/infrastructure/repositories/game/port/get-game.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetContinuedGameInclude } from '../domain/services/query/get-continued-game.query.service';
import { GetContinuedGameListEntity } from '../domain/entities/get-continued-game-list.entity';

@Injectable()
export class GetContinuedGameListComponent {
  constructor(
    @Inject('GetGameRepository')
    private readonly gameRepository: GetGameRepositoryPort,
  ) {}

  async getContinuedGameListEntity(
    getContinuedGameListQuery: Prisma.GameFindManyArgs<any>,
  ) {
    const games = (await this.gameRepository.getGames(
      getContinuedGameListQuery,
    )) as unknown as Prisma.GameGetPayload<{
      include: GetContinuedGameInclude;
    }>[];

    return new GetContinuedGameListEntity(games);
  }
}
