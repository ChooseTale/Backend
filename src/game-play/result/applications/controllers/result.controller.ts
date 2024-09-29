import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetResultScreenDto } from '../dto/get-result-screen.dto';
import { GetResultScreenUsecase } from '../../domain/usecases/get-result-screen.usecase';

@Controller('/result')
export class ResultController {
  constructor(
    private readonly getResultScreenUsecase: GetResultScreenUsecase,
  ) {}

  /**
   * 게임 결과 화면 조회
   *
   * 게임 결과 화면을 조회하는 API
   *
   * @summary 게임 결과 화면 조회 🟡(240916)
   * @tag Play-Game
   * @param playId
   * @returns
   */
  @Get('/:playId')
  async getResultScreen(
    @Param('playId', ParseIntPipe) playId: number,
  ): Promise<GetResultScreenDto> {
    return await this.getResultScreenUsecase.execute(playId, 1);
    return {
      endingPage: {
        id: 1,
        abridgement: '페이지 1의 요약',
      },
      choosenPages: [
        {
          id: 1,
          abridgement: '페이지 1의 요약',
          choices: [
            {
              id: 1,
              title: '선택지 1의 제목',
              percentage: 0.4,
            },
            {
              id: 2,
              title: '선택지 2의 제목',
              percentage: 0.6,
            },
          ],
        },
        {
          id: 2,
          abridgement: '페이지 2의 요약',
          choices: [
            {
              id: 1,
              title: '선택지 1의 제목',
              percentage: 0.33,
            },
            {
              id: 2,
              title: '선택지 2의 제목',
              percentage: 0.33,
            },
            {
              id: 3,
              title: '선택지 3의 제목',
              percentage: 0.33,
            },
          ],
        },
      ],
    };
  }
}
