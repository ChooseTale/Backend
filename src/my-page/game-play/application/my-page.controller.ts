import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { GetContinuedGameListQueryDto } from './dto/req/get-continued-game-list.req.dto';
import { GetEndedGameListQueryDto } from './dto/req/get-ended-game-list.req.dto';
import { GetEndedGroupGameListQueryDto } from './dto/req/get-ended-group-game-list.req.dto';
import config from '@@src/config';
import { GetContinuedGameUsecase } from '../domain/usecases/get-continued-game.usecase';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';

@Controller('my-page')
@UseGuards(AuthSerializeGuard)
export class MyPageController {
  constructor(
    private readonly getContinuedGameUsecase: GetContinuedGameUsecase,
  ) {}

  /**
   * 진행중인 게임 리스트를 출력합니다.
   * 가로스크롤 리스트에서는 limit, order, genre를 각각 8, LATEST, ALL로 보내주시면 됩니다.
   * 정렬의 기준은 '최근 플레이한 순서' 입니다.
   * order은 LATEST, OLDEST 중 하나를 선택할 수 있습니다.
   *
   * @tag MyPage
   * @summary 진행중인 게임 리스트
   */
  @Get('/continued-game')
  async getContinuedGameList(
    @Req() req: any,
    @Query() query: GetContinuedGameListQueryDto,
  ) {
    return this.getContinuedGameUsecase.execute(req.user.id, query);
    return [
      {
        game: {
          id: 1,
          title: '게임 제목',
          thumbnail: {
            url:
              config.apiHost +
              '/test-uploads/game-thumnail-images/사랑은타이밍.png',
          },
          genre: 'HORROR',
        },
        play: {
          id: 1,
          createdAt: new Date(),
          page: {
            id: 1,
            abridgement: '민수는 공동체와 협력해 대피소를 강화한다.',
          },
        },
      },
    ];
  }

  /**
   * 완료한 엔딩 리스트를 출력합니다.
   * '날짜별' 에 출력될 수 있는 Response타입을 가집니다.
   * 정렬의 기준은 '최근 플레이한 순서' 입니다.
   * order은 LATEST, OLDEST 중 하나를 선택할 수 있습니다.
   *
   * @tag MyPage
   * @summary 완료한 엔딩 리스트
   */
  @Get('/ended-game')
  async getEndedGameList(@Query() query: GetEndedGameListQueryDto) {
    return [
      {
        game: {
          id: 1,
          title: '게임 제목',
          thumbnail: {
            url:
              config.apiHost +
              '/test-uploads/game-thumnail-images/사랑은타이밍.png',
          },
          genre: 'HORROR',
          reachedEndingAt: new Date(),
        },
      },
    ];
  }

  /**
   * 완료한 엔딩 리스트를 게임으로 그루핑해 출력합니다.
   * '게임별' 에 출력될 수 있는 Response타입을 가집니다.
   * 정렬의 기준은 '최근 플레이한 순서' 입니다.
   * 최근에 플레이한 기록이 있는 게임이 먼저 출력됩니다.
   * order은 LATEST, OLDEST 중 하나를 선택할 수 있습니다.

   * @tag MyPage
   * @summary 완료한 그룹 게임 리스트
   */
  @Get('/ended-game/group-game')
  async getEndedGroupGameList(@Query() query: GetEndedGroupGameListQueryDto) {
    return [
      {
        game: {
          id: 1,
          title: '부산행: 열차에 좀비가 나타났다.',
          genre: 'HORROR',
          totalEndingCount: 4,
          thumbnail: {
            url:
              config.apiHost +
              '/test-uploads/game-thumnail-images/사랑은타이밍.png',
          },
          endings: [
            {
              playId: 1,
              endingNumber: 1,
              abridgement: '지안은 탈출한다.',
              reachedEndingAt: new Date(),
            },
            {
              playId: 2,
              endingNumber: 3,
              abridgement: '지안은 탈출하지 못한다.',
              reachedEndingAt: new Date(),
            },
          ],
        },
      },
    ];
  }
}
