import { IntroEntity } from '../entities/intro-data.entity';

export const getExpectPlayTime = (introEntity: IntroEntity) => {
  const pageLength = introEntity.game.pages.length;

  let expectPlayTime = 1;
  let count = 1;
  while (count < pageLength) {
    count *= 2;
    expectPlayTime += 1;
  }
  return expectPlayTime;
};

export const getCompletedEndingCount = (introEntity: IntroEntity) => {
  const playGameDatas = introEntity.playGameDatas;
  const completedEndingCount = playGameDatas.filter(
    (play) => play.isEnded,
  ).length;
  return completedEndingCount;
};
