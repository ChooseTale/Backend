import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  GameGetPayload,
  ListPageEntity,
} from '../domain/entities/list-page.entity';
import { PageNationComponentInterface } from './port/page-nation.component.interface';
import { GetGameRepositoryPort } from '@@src/common/infrastructure/repositories/game/port/get-game.repository';

@Injectable()
export class PageNationComponent implements PageNationComponentInterface {
  constructor(
    @Inject('GetGameRepository')
    private readonly gameRepository: GetGameRepositoryPort,
  ) {}

  async getPageEntity(query: Prisma.GameFindManyArgs): Promise<ListPageEntity> {
    const games = (await this.gameRepository.getGames(
      query,
    )) as unknown as GameGetPayload[];

    return new ListPageEntity(games);
  }
}
