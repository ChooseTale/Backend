import { ChooseChoiceEntity } from '../../domain/entities/choose-choice.entity';

export interface ChooseChoiceComponentInterface {
  chooseChoice(
    choiceId: number,
    playGameId: number,
  ): Promise<ChooseChoiceEntity>;
  updateEndingToPlayGame(playGameId: number, toPageId: number): Promise<void>;
}
