import { GetMyBuildedGameResDto } from '@@src/my-page/game-builder/application/dto/res/get-my-builded-game.res.dto';
import { GetMyBuildedGamesEntity } from '../../entities/get-my-builded-games.entity';

export const toGetMyBuildedGameMapper = (
  game: GetMyBuildedGamesEntity,
  count: number,
): GetMyBuildedGameResDto => {
  return {
    count,
    games: game.list.map((game) => {
      return {
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
        description: game.description,
        genre: game.genre,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        count: {
          endingCount: game.count.endingCount,
          choiceCount: game.count.choiceCount,
          pageCount: game.count.pageCount,
          reachEndingPlayerCount: game.count.reachEndingPlayerCount,
        },
      };
    }),
  };
};
