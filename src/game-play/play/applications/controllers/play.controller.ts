import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetPlayGameScreenDto } from '../dto/get-play-game-screen.dto';
import { ChooseChoiceResDto } from '../dto/choose-choice.dto';

@Controller('/play')
export class PlayController {
  constructor() {}

  /**
   *
   * 게임 플레이 화면 조회
   *
   * 게임을 플레이 하기 위한 데이터를 조회합니다.
   * gameIntroData는 모달창에서 출력할 수 있는 데이터입니다.
   * page는 유저가 플레이중인 게임의 페이지의 데이터를 출력합니다.
   *
   * @param gameId
   * @param pageId
   * @returns
   */
  @Get('/:gameId/page/:pageId')
  async getPlayGameScreen(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
  ): Promise<GetPlayGameScreenDto> {
    return {
      playId: 1,
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
      page: [
        {
          id: 1,
          description: '페이지의 내용들',
          tempDescription:
            '이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요. 이 변수값은 없어질건데 내용이 긴게 필요할까봐 넣어둘게요. 추후에는 descriptions만 남길게요.',
          choices: [
            {
              id: 1,
              title: '선택지 1',
              description:
                '선택지 1의 설명 예시입니다. 길이가 길면 어떻게 되죠',
              childPageId: 2,
            },
            {
              id: 2,
              title: '선택지 2',
              description: '선택지 2의 설명',
              nextPageId: 3,
            },
          ],
          isEnding: false,
        },
      ],
    };
  }

  /**
   *
   * 선택지 선택
   *
   * 유저의 선택지 선택 데이터를 저장하기 위한 API
   *
   * @param playId
   * @param choiceId
   * @returns
   */
  @Post('/:playId/choice/:choiceId')
  async chooseChoice(
    @Param('playId', ParseIntPipe) playId: number,
    @Param('choiceId', ParseIntPipe) choiceId: number,
  ): Promise<ChooseChoiceResDto> {
    return {
      playId: 1,
      page: {
        id: 1,
        description: '페이지의 내용들',
      },
    };
  }
}
