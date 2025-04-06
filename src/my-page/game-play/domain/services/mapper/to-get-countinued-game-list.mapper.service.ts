import { GetContinuedGameListResDto } from '@@src/my-page/game-play/application/dto/res/get-continued-game-list.res.dto';
import { GetContinuedGameListEntity } from '../../entities/get-continued-game-list.entity';

export const toGetContinuedGameListResDto = (
  continuedGameListEntity: GetContinuedGameListEntity,
  count: number,
): GetContinuedGameListResDto => {
  return {
    count,
    list: continuedGameListEntity.list.map((game) => {
      return {
        game: game.game,
        play: game.play,
      };
    }),
  };
};
