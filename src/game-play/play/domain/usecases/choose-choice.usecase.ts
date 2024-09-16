import { Inject, Injectable } from '@nestjs/common';
import { ChooseChoiceResDto } from '../../applications/dto/choose-choice.dto';
import { ChooseChoiceComponentInterface } from '../../components/port/choose-choice.component.interface';

@Injectable()
export class ChooseChoiceUsecase {
  constructor(
    @Inject('ChooseChoiceComponent')
    private readonly chooseChoiceComponent: ChooseChoiceComponentInterface,
  ) {}

  async execute(
    playGameId: number,
    choiceId: number,
    userId: number,
  ): Promise<ChooseChoiceResDto> {
    const { pageId } = await this.chooseChoiceComponent.chooseChoice(
      choiceId,
      playGameId,
      userId,
    );
    return {
      playId: playGameId,
      page: {
        id: pageId,
      },
    };
  }
}
