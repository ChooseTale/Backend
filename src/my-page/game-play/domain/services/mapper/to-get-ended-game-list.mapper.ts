import { GetEndedGameListResDto } from '@@src/my-page/game-play/application/dto/res/get-ended-game-list.res.dto';
import { GetEndedGameListEntity } from '../../entities/get-ended-game-list.entity';

export const toGetEndedGameListResDto = (
  endedGameListEntity: GetEndedGameListEntity,
): GetEndedGameListResDto[] => {
  return endedGameListEntity.list.map((game) => {
    return {
      ending: {
        playId: game.ending.playId,
      },
      game: {
        id: game.game.id,
        title: game.game.title,
        thumbnail: game.game.thumbnail,
        genre: game.game.genre,
        reachedEndingAt: game.game.reachedEndingAt,
      },
    };
  });
};
