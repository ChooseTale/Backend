import { GetEndedGroupGameListResDto } from '@@src/my-page/game-play/application/dto/res/get-ended-group-game-list.res.dto';
import { GetEndedGroupGameListEntity } from '../../entities/get-ended-group-game-list.entity';

export const toGetEndedGroupGameListResDto = (
  entity: GetEndedGroupGameListEntity,
): GetEndedGroupGameListResDto[] => {
  return entity.list.map((game) => {
    return {
      game: {
        id: game.game.id,
        title: game.game.title,
        genre: game.game.genre,
        totalEndingCount: game.game.totalEndingCount,
        thumbnail: {
          url: game.game.thumbnailUrl,
        },
        endings: game.endings.map((ending) => {
          return {
            playId: ending.playId,
            endingNumber: ending.endingNumber,
            title: ending.title,
            reachedEndingAt: ending.reachedEndingAt,
          };
        }),
      },
    };
  });
};
