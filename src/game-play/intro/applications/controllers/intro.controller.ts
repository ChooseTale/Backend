import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetIntroScreenResDto } from '../dto/get-intro-screnn.dto';
import { FirstStartGameResDto } from '../dto/first-start-game.dto';
import { GetIntroScreenUsecase } from '../../domain/usecases/get-intro-screen.usecase';
import { FirstStartGameUsecase } from '../../domain/usecases/first-start-game.usecase';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';

@Controller('/intro')
@UseGuards(AuthSerializeGuard)
export class IntroController {
  constructor(
    private readonly getIntroScreenUsecase: GetIntroScreenUsecase,
    private readonly firstStartGameUsecase: FirstStartGameUsecase,
  ) {}

  /**
   * 게임 소개 인트로 조회
   *
   * 게임의 소개 화면을 조회하는 API
   *
   * - 특이사항: 유저의 닉네임과 프로필 이미지는 아직 구현하지 않음.
   * @tag Play-Game
   * @summary 게임 소개 인트로 조회 🟡(240916)
   * @param gameId 게임 아이디
   * @returns 게임 소개 화면 데이터
   */
  @Get('/:gameId')
  async getIntroScreen(
    @Req() req: any,
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<GetIntroScreenResDto> {
    return await this.getIntroScreenUsecase.execute(gameId, req.user.id);
  }

  /**
   * 게임 첫 시작
   *
   * 게임의 '처음 시작' 버튼을 클릭했을 때 호출되는 API
   *
   * @summary 게임 첫 시작 🟡(240916)
   * @tag Play-Game
   * @returns 플레이 아이디, 첫 시작 페이지 아이디
   */
  @Post('/:gameId/first-start')
  async firstStartGame(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Req() req: any,
  ): Promise<FirstStartGameResDto> {
    return await this.firstStartGameUsecase.execute(gameId, req.user.id);
  }
}
