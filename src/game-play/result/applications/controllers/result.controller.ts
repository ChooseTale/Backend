import { Controller, Get } from '@nestjs/common';

@Controller('/result')
export class ResultController {
  constructor() {}

  @Get('/:playId')
  async getResultScreen() {
    return {
      endingPage: {
        id: 1,
        abridgement: '페이지 1의 요약',
      },
      chosenPages: [
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
