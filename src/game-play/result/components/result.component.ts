import { ChoicePageRepositoryPort } from '@@src/common/infrastructure/repositories/choice-page/port/choice-page.repository.interface';

import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';
import { PlayRepositoryPort } from '@@src/common/infrastructure/repositories/play-game/port/play.repository.interface';
import { UserChoiceRepositoryPort } from '@@src/common/infrastructure/repositories/user-choice/port/user-choice.repository.interface';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GamePlayResultEntity } from '../domain/entities/result.entity';

@Injectable()
export class GameResultComponent {
  constructor(
    @Inject('PlayGameRepository')
    private readonly playRepository: PlayRepositoryPort,
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('UserChoiceRepository')
    private readonly userChoiceRepository: UserChoiceRepositoryPort,
    @Inject('ChoicePageRepository')
    private readonly choicePageRepository: ChoicePageRepositoryPort,
  ) {}

  async getResultEntity(playId: number, userId: number) {
    const play = await this.playRepository.getPlayById(playId);

    if (!play) {
      throw new NotFoundException('Play not found');
    }
    const totalPlay = await this.playRepository.getAllByUserIdAndGameId(
      userId,
      play?.gameId,
    );

    const totalEnding = await this.pageRepository.getAll({
      select: {
        id: true,
      },
      where: {
        isEnding: true,
        gameId: play.gameId,
      },
    });

    const userChoices = await this.userChoiceRepository.getAllByPlayId(playId);

    const choicePagesToChooseByUser =
      await this.choicePageRepository.getChoicePageByIds(
        userChoices.map((choice) => choice.choicePageId),
      );

    const choicePagesEqualFromPage =
      await this.choicePageRepository.getAllByFromPageIds(
        choicePagesToChooseByUser.map((choicePage) => choicePage.fromPageId),
      );

    const allUserChoices =
      await this.userChoiceRepository.getAllByChoicePageIds(
        choicePagesEqualFromPage.map((choicePage) => choicePage.id),
      );

    const pages = await this.pageRepository.getAllByGameId(play.gameId);

    const gamePlayResultEntity = new GamePlayResultEntity(
      pages,
      choicePagesToChooseByUser,
      allUserChoices,
      userChoices,
      choicePagesEqualFromPage,
    );

    gamePlayResultEntity.setGameId(play.gameId);
    const uniqueTotalPlay = totalPlay.filter(
      (play, index, self) =>
        index === self.findIndex((p) => p.endingPageId === play.endingPageId),
    );

    gamePlayResultEntity.setTotalPlayCount(totalPlay.length);
    gamePlayResultEntity.setTotalEndingCount(totalEnding.length);
    gamePlayResultEntity.setReachEndingCount(uniqueTotalPlay.length);

    return gamePlayResultEntity;
  }
}
