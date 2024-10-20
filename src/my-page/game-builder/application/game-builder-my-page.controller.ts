import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { GetMyBuildedGamesQueryDto } from './dto/req/get-my-builded-game.req.dto';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';
import { GetMyBuildedGameResDto } from './dto/res/get-my-builded-game.res.dto';
import config from '@@src/config';
import { GetMyBuildedGameUsecase } from '../domain/usecases/get-my-builded-game.usecase';

@Controller('my-page/game-builder')
@UseGuards(AuthSerializeGuard)
export class GameBuilderMyPageController {
  constructor(
    private readonly getMyBuildedGameUsecase: GetMyBuildedGameUsecase,
  ) {}
  /**
   * 필터에 따라 내가 제작한 게임 중 제작중, 공개중인 게임들을 조회합니다.
   *
   * status: 게임 상태
   * - PUBLISHED: 공개중인 게임
   * - BUILDING: 제작중인 게임
   *
   *
   * 공개중인 게임을 클릭하면, 게임 결과 페이지로 이동합니다.
   * 제작중인 게임을 클릭하면, 게임 제작 페이지로 이동합니다.
   *
   * reponse: reachEndingPlayerCount는 status가 PUBLISHED일 때만 존재합니다.
   * 그 외에는 null 입니다.
   *
   * @tag MyPage-GameBuilder
   * @summary 내가 제작한 게임 조회
   */
  @Get()
  async getMyBuildedGames(
    @Req() req: any,
    @Query() query: GetMyBuildedGamesQueryDto,
  ): Promise<GetMyBuildedGameResDto> {
    const userId = req.user.id;
    return await this.getMyBuildedGameUsecase.execute(userId, query);
  }
}
