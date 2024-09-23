import { UserChoiceRepositoryPort } from '@@src/common/infrastructure/repositories/user-choice/port/user-choice.repository.interface';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ChooseChoiceComponentInterface } from './port/choose-choice.component.interface';
import { ChoicePageRepositoryPort } from '@@src/common/infrastructure/repositories/choice-page/port/choice-page.repository.interface';

@Injectable()
export class ChooseChoiceComponent implements ChooseChoiceComponentInterface {
  constructor(
    @Inject('ChoicePageRepository')
    private readonly choicePageRepository: ChoicePageRepositoryPort,
    @Inject('UserChoiceRepository')
    private readonly userChoiceRepository: UserChoiceRepositoryPort,
  ) {}

  async chooseChoice(
    choiceId: number,
    playGameId: number,
    userId: number,
  ): Promise<{ pageId: number }> {
    const choice = await this.choicePageRepository.getOneByIdOrThrow(choiceId);

    if (choice.toPageId === null) {
      throw new BadRequestException(
        '선택지에 연결된 페이지가 없습니다. 엔딩 페이지일 확률이 있습니다.',
      );
    }

    await this.userChoiceRepository.create(playGameId, choice.toPageId);

    return { pageId: choice.toPageId };
  }
}
