export interface ChooseChoiceComponentInterface {
  chooseChoice(
    choiceId: number,
    playGameId: number,
    userId: number,
  ): Promise<{ pageId: number }>;
}
