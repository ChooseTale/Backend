import { GetGameRepositoryPort } from '@@src/common/infrastructure/repositories/game/port/get-game.repository';
import { Inject, Injectable } from '@nestjs/common';
import { GetPlayGameResultEntity } from '../domain/entities/get-play-game-result.entity';

import { UserChoiceRepositoryPort } from '@@src/common/infrastructure/repositories/user-choice/port/user-choice.repository.interface';
import { ChoicePageRepositoryPort } from '@@src/common/infrastructure/repositories/choice-page/port/choice-page.repository.interface';
import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';

@Injectable()
export class ResultComponent {
  constructor(
    @Inject('GetGameRepository')
    private readonly gameRepository: GetGameRepositoryPort,
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('UserChoiceRepository')
    private readonly userChoiceRepository: UserChoiceRepositoryPort,
    @Inject('ChoicePageRepository')
    private readonly choicePageRepository: ChoicePageRepositoryPort,
  ) {}

  async getPlayGameResultEntity(
    userId: number,
    gameId: number,
  ): Promise<GetPlayGameResultEntity> {
    const game = await this.gameRepository.getGameByIdOrThrow(gameId);
    const pages = await this.pageRepository.getAllByGameId(gameId);
    const choicePages = await this.choicePageRepository.getAllByGameId(gameId);

    const userChoices = await this.userChoiceRepository.getAllByChoicePageIds(
      choicePages.map((choicePage) => choicePage.id),
    );

    return new GetPlayGameResultEntity(game, pages, choicePages, userChoices);
  }
}
