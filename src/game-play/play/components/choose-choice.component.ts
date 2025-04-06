import { UserChoiceRepositoryPort } from '@@src/common/infrastructure/repositories/user-choice/port/user-choice.repository.interface';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ChooseChoiceComponentInterface } from './port/choose-choice.component.interface';
import { ChoicePageRepositoryPort } from '@@src/common/infrastructure/repositories/choice-page/port/choice-page.repository.interface';
import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';
import { ChooseChoiceEntity } from '../domain/entities/choose-choice.entity';
import { PlayRepositoryPort } from '@@src/common/infrastructure/repositories/play-game/port/play.repository.interface';

@Injectable()
export class ChooseChoiceComponent implements ChooseChoiceComponentInterface {
  constructor(
    @Inject('ChoicePageRepository')
    private readonly choicePageRepository: ChoicePageRepositoryPort,
    @Inject('UserChoiceRepository')
    private readonly userChoiceRepository: UserChoiceRepositoryPort,
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('PlayGameRepository')
    private readonly playGameRepository: PlayRepositoryPort,
  ) {}

  async chooseChoice(
    choiceId: number,
    playGameId: number,
  ): Promise<ChooseChoiceEntity> {
    const choice = await this.choicePageRepository.getOneByIdOrThrow(choiceId);

    if (choice.toPageId === null) {
      throw new BadRequestException(
        '선택지에 연결된 페이지가 없습니다. 엔딩 페이지일 확률이 있습니다.',
      );
    }

    const currentPage = await this.pageRepository.getByIdOrThrow(
      choice.fromPageId,
    );

    if (!currentPage) {
      throw new BadRequestException('현재 페이지가 없습니다.');
    }

    await this.userChoiceRepository.create(playGameId, choice.id);

    const toPage = await this.pageRepository.getByIdOrThrow(choice.toPageId);

    return new ChooseChoiceEntity(choice, toPage, currentPage);
  }

  async updateEndingToPlayGame(
    playGameId: number,
    toPageId: number,
  ): Promise<void> {
    await this.playGameRepository.update(playGameId, {
      endingPageId: toPageId,
    });
  }
}
