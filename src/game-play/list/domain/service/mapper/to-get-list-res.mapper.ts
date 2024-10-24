import { GetListResDto } from '@@src/game-play/list/applications/dto/get-list/get-list.res.dto';
import { ListPageEntity } from '../../entities/list-page.entity';
import { getImagePath } from '@@src/common/components/images/get-path.component';
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
          thumbnail: game.game.thumbnail
            ? {
                id: game.game.thumbnail.id,
                url: getImagePath(game.game.thumbnail.url),
              }
            : null,
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
                  profileImage: {
                    url: getImagePath(curr.user.profileImage.url),
                  },
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
          profileImage: {
            url: getImagePath(game.publisher.profileImage.url),
          },
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
              .filter(
                (playGame) =>
                  playGame.user.id === myUser.id && playGame.isEnded,
              )
              .reduce((acc: number[], playGame) => {
                if (
                  playGame.endingPageId &&
                  !acc.some((id) => id === playGame.endingPageId)
                ) {
                  acc.push(playGame.endingPageId);
                }
                return acc;
              }, []).length,
            isExistContinuePlay: game.game.playGame
              .filter((playGame) => playGame.user.id === myUser.id)
              .some((playGame) => !playGame.isEnded),
          },
        },
      };
    });
  }
}
