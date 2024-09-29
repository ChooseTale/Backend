import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetPlayGameScreenDto } from '../dto/get-play-game-screen.dto';
import { ChooseChoiceResDto } from '../dto/choose-choice.dto';
import { GetPlayGameScreenUsecase } from '../../domain/usecases/get-play-game-screen.usecase';
import { ChooseChoiceUsecase } from '../../domain/usecases/choose-choice.usecase';

@Controller('/play')
export class PlayController {
  constructor(
    private readonly getPlayGameScreenUsecase: GetPlayGameScreenUsecase,
    private readonly chooseChoiceUsecase: ChooseChoiceUsecase,
  ) {}

  /**
   *
   * 게임 플레이 화면 조회
   *
   * 게임을 플레이 하기 위한 데이터를 조회합니다.
   * gameIntroData는 모달창에서 출력할 수 있는 데이터입니다.
   * page는 유저가 플레이중인 게임의 페이지의 데이터를 출력합니다.
   *
   * @tag Play-Game
   * @summary 게임 플레이 화면 조회 🟡(240916)
   * @param gameId
   * @param pageId
   * @returns
   */
  @Get('/:gameId/page/:pageId')
  async getPlayGameScreen(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
  ): Promise<GetPlayGameScreenDto> {
    return await this.getPlayGameScreenUsecase.execute(gameId, 1, pageId);
  }

  /**
   *
   * 선택지 선택
   *
   * 유저의 선택지 선택 데이터를 저장하기 위한 API
   *
   * @summary 선택지 선택 🟡(240916)
   * @tag Play-Game
   * @param playId
   * @param choiceId
   * @returns
   */
  @Post('/:playId/choice/:choiceId')
  async chooseChoice(
    @Param('playId', ParseIntPipe) playId: number,
    @Param('choiceId', ParseIntPipe) choiceId: number,
  ): Promise<ChooseChoiceResDto> {
    return await this.chooseChoiceUsecase.execute(playId, choiceId, 1);
  }
}
