import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { GetContinuedGameListQueryDto } from './dto/req/get-continued-game-list.req.dto';
import { GetEndedGameListQueryDto } from './dto/req/get-ended-game-list.req.dto';
import { GetEndedGroupGameListQueryDto } from './dto/req/get-ended-group-game-list.req.dto';
import config from '@@src/config';
import { GetContinuedGameUsecase } from '../domain/usecases/get-continued-game.usecase';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';
import { GetEndedGameListUsecase } from '../domain/usecases/get-ended-game-list.usecase';
import { GetEndedGameListResDto } from './dto/res/get-ended-game-list.res.dto';
import { GetContinuedGameListResDto } from './dto/res/get-continued-game-list.res.dto';
import { GetEndedGroupGameListUsecase } from '../domain/usecases/get-ended-group-game-list.usecase';
import { GetEndedGroupGameListResDto } from './dto/res/get-ended-group-game-list.res.dto';
import { ListConditionDto } from './dto/req/list-condition.dto';

@Controller('my-page')
@UseGuards(AuthSerializeGuard)
export class MyPageController {
  constructor(
    private readonly getContinuedGameUsecase: GetContinuedGameUsecase,
    private readonly getEndedGameUsecase: GetEndedGameListUsecase,
    private readonly getEndedGroupGameListUsecase: GetEndedGroupGameListUsecase,
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
  ): Promise<GetContinuedGameListResDto> {
    return this.getContinuedGameUsecase.execute(req.user.id, query);
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
  async getEndedGameList(
    @Req() req: any,
    @Query() query: GetEndedGameListQueryDto,
  ): Promise<GetEndedGameListResDto[]> {
    return this.getEndedGameUsecase.execute(req.user.id, query);
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
  async getEndedGroupGameList(
    @Req() req: any,
    @Query() query: GetEndedGroupGameListQueryDto,
  ): Promise<GetEndedGroupGameListResDto> {
    return await this.getEndedGroupGameListUsecase.execute(req.user.id, query);
  }
}
