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
    const chooseChoiceEntity = await this.chooseChoiceComponent.chooseChoice(
      choiceId,
      playGameId,
    );
    if (chooseChoiceEntity.checkIsEnding()) {
      await this.chooseChoiceComponent.updateEndingToPlayGame(
        playGameId,
        chooseChoiceEntity.toPage.id,
      );
    }
    console.log(chooseChoiceEntity);
    return {
      playId: playGameId,
      page: {
        id: chooseChoiceEntity.toPage.id,
      },
    };
  }
}
