import { GetGameRepositoryPort } from '@@src/common/infrastructure/repositories/game/port/get-game.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetContinuedGameInclude } from '../domain/services/query/get-continued-game.query.service';
import { GetContinuedGameListEntity } from '../domain/entities/get-continued-game-list.entity';
import { GetEndedGameInclude } from '../domain/services/query/get-ended-game.query.service';
import { GetEndedGameListEntity } from '../domain/entities/get-ended-game-list.entity';
import { PlayRepositoryPort } from '@@src/common/infrastructure/repositories/play-game/port/play.repository.interface';
import { EndedGroupGameInclude } from '../domain/services/query/get-ended-group-game-list.query.service';
import { GetEndedGroupGameListEntity } from '../domain/entities/get-ended-group-game-list.entity';

@Injectable()
export class GetGameListComponent {
  constructor(
    @Inject('GetGameRepository')
    private readonly gameRepository: GetGameRepositoryPort,
    @Inject('PlayGameRepository')
    private readonly playRepository: PlayRepositoryPort,
  ) {}

  async getContinuedGameListEntity(
    getContinuedGameListQuery: Prisma.PlayGameFindManyArgs<any>,
  ) {
    const games = (await this.playRepository.getAll(
      getContinuedGameListQuery,
    )) as unknown as Prisma.PlayGameGetPayload<{
      include: GetContinuedGameInclude;
    }>[];

    return new GetContinuedGameListEntity(games);
  }

  async getEndedGameListEntity(
    getEndedGameListQuery: Prisma.PlayGameFindManyArgs<any>,
  ) {
    const playGames = (await this.playRepository.getAll(
      getEndedGameListQuery,
    )) as unknown as Prisma.PlayGameGetPayload<{
      include: GetEndedGameInclude;
    }>[];

    return new GetEndedGameListEntity(playGames);
  }

  async getEndedGroupGameListEntity(
    getEndedGroupGameListQuery: Prisma.PlayGameFindManyArgs<any>,
  ) {
    const playGames = (await this.playRepository.getAll(
      getEndedGroupGameListQuery,
    )) as unknown as Prisma.PlayGameGetPayload<{
      include: EndedGroupGameInclude;
    }>[];

    return new GetEndedGroupGameListEntity(playGames);
  }
}
