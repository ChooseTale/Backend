import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetIntroScreenResDto } from '../dto/get-intro-screnn.dto';
import { FirstStartGameResDto } from '../dto/first-start-game.dto';
import { ContinueGameResDto } from '../dto/countinue-game.dto';
import { GetIntroScreenUsecase } from '../../domain/usecases/get-intro-screen.usecase';

@Controller('/intro')
export class IntroController {
  constructor(private readonly getIntroScreenUsecase: GetIntroScreenUsecase) {}

  @Get('/:gameId')
  async getIntroScreen(
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<GetIntroScreenResDto> {
    await this.getIntroScreenUsecase.execute(gameId, 4);
    return {
      game: {
        id: 1,
        title: '게임의 타이틀',
        description: '게임의 설명',
        genre: '게임의 장르',
        thumbnailUrl: '게임의 썸네일 URL',
        producer: {
          userId: 1,
          nickname: '게임 제작자 닉네임',
          profileImageUrl: '게임 제작자 프로필 이미지 URL',
        },
      },
      play: {
        id: 1, // play id,
        page: {
          id: 1,
          abridgement: '페이지의 요약',
        },
      },
      firstPage: {
        id: 1,
      },
      enrichData: {
        lastUpdatedAt: new Date(),
        totalPlayCount: 5,
        expectPlayTime: 10,
        completedEnding: 3,
        totalEnding: 5,
      },
    };
  }

  /**
   * 게임 첫 시작
   *
   * 게임의 '처음 시작' 버튼을 클릭했을 때 호출되는 API
   *
   * @returns 플레이 아이디, 첫 시작 페이지 아이디
   */
  @Post('/:gameId/first-start')
  async firstStartGame(
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<FirstStartGameResDto> {
    return {
      playId: 1,
    };
  }

  /**
   * 게임 이어하기
   *
   * 게임의 '이어하기' 버튼을 클릭했을 때 호출되는 API
   *
   * @returns 플레이 아이디, 최근 플레이 한 페이지 아이디
   */
  @Post('/:gameId/continue')
  async continueGame(
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<ContinueGameResDto> {
    return {
      playId: 1,
    };
  }
}
