import { GetPlayGameResultDto } from '@@src/my-page/game-builder/application/dto/res/get-play-game-result.res.dto';
import { GetPlayGameResultEntity } from '../../entities/get-play-game-result.entity';

export const toGetPlayGameResultMapper = (
  entity: GetPlayGameResultEntity,
): GetPlayGameResultDto => {
  return {
    endingPage: {
      id: entity.endingPage.id,
      abridgement: entity.endingPage.abridgement,
    },
    choosenPages: entity.choosenPages.map((choosenPage) => {
      return {
        id: choosenPage.id,
        abridgement: choosenPage.abridgement,
        choices: choosenPage.choices,
      };
    }),
  };
};
