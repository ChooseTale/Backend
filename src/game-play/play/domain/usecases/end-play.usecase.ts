import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';
import { PlayRepositoryPort } from '@@src/common/infrastructure/repositories/play-game/port/play.repository.interface';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ChooseChoiceComponentInterface } from '../../components/port/choose-choice.component.interface';

@Injectable()
export class EndPlayUsecase {
  constructor(
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('ChooseChoiceComponent')
    private readonly chooseChoiceComponent: ChooseChoiceComponentInterface,
    @Inject('PlayGameRepository')
    private readonly playRepository: PlayRepositoryPort,
  ) {}

  async execute(playId: number, pageId: number) {
    const play = await this.playRepository.getPlayById(playId);
    if (!play) {
      throw new BadRequestException('플레이 데이터가 없습니다.');
    }

    if (play.endingPageId) {
      throw new BadRequestException('이미 엔딩 페이지를 선택했습니다.');
    }

    const currentPage = await this.pageRepository.getByIdOrThrow(pageId);

    if (!currentPage.isEnding) {
      throw new BadRequestException('엔딩 페이지가 아닙니다.');
    }

    if (currentPage.gameId !== play.gameId) {
      throw new BadRequestException('게임이 일치하지 않습니다.');
    }

    await this.chooseChoiceComponent.updateEndingToPlayGame(
      playId,
      currentPage.id,
    );
  }
}
