import { Controller, Get, Post } from '@nestjs/common';

@Controller('/intro')
export class IntroController {
  constructor() {}

  @Get('/:gameId')
  async getIntroScreen() {
    return {
      gameIntroData: {
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
        enrichData: {
          lastUpdatedAt: new Date(),
          totalPlayCount: 5,
          expectPlayTime: 10,
          completedEnding: 3,
          totalEnding: 5,
        },
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
  async firstStartGame() {
    return {
      playId: 1,
      page: {
        id: 1,
      },
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
  async continueGame() {
    return {
      playId: 1,
      page: {
        id: 1,
      },
    };
  }
}
