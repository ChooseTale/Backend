import { GetListResDto } from '@@src/game-play/list/applications/dto/get-list/get-list.res.dto';
import { ListPageEntity } from '../../entities/list-page.entity';

export class ToGetListResMapper {
  static toGetListRes(
    listPageEntity: ListPageEntity,
    myUser: { id: number },
  ): GetListResDto[] {
    return listPageEntity.list.map((game) => {
      return {
        game: {
          id: game.game.id,
          title: game.game.title,
          thumbnail: game.game.thumbnail,
          genre: game.game.genre,
          createdAt: game.game.createdAt,
          updatedAt: game.game.updatedAt,

          player: game.game.playGame.reduce(
            (
              prev: {
                userId: number;
                nickname: string;
                profileImage: { url: string };
              }[],
              curr,
            ) => {
              if (!prev.some((player) => player.userId === curr.user.id)) {
                prev.push({
                  userId: curr.user.id,
                  nickname: curr.user.nickname,
                  profileImage: curr.user.profileImage,
                });
              }
              return prev;
            },
            [],
          ),
        },
        publisher: {
          userId: game.publisher.userId,
          nickname: game.publisher.nickname,
          profileImage: game.publisher.profileImage,
        },
        enrichData: {
          totalEndingCount: game.enrichData.totalEndingCount,
          totalRechedEndingPlayCount:
            game.enrichData.totalRechedEndingPlayCount,
          expectPlayTime: game.enrichData.expectPlayTime,
          me: {
            isExistReachedEndingPlay: game.game.playGame
              .filter((playGame) => playGame.user.id === myUser.id)
              .some((playGame) => playGame.isEnded),
            reachedEndingPlayCount: game.game.playGame
              .filter((playGame) => playGame.user.id === myUser.id)
              .reduce((acc, playGame) => acc + (playGame.isEnded ? 1 : 0), 0),
            isExistContinuePlay: game.game.playGame
              .filter((playGame) => playGame.user.id === myUser.id)
              .some((playGame) => !playGame.isEnded),
          },
        },
      };
    });
  }
}
