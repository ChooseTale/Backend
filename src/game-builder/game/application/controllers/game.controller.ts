import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGameReqDto, CreateGameResDto } from './dto/create-game.dto';
import { UpdateGameReqDto, UpdateGameResDto } from './dto/update-game.dto';
import { GetAllGameResDto } from './dto/get-all-game.dto';

import { CreateGameUsecase } from '../usecases/create-game.usecase';

@Controller('game')
export class GameController {
  constructor(private readonly createGameUsecase: CreateGameUsecase) {}

  /**
   * 게임 데이터 불러오기
   *
   * 메인(리스트) 페이지에 출력 할 게임의 정보를 관리하는 데이터를 불러옵니다.
   *
   * isPrivate가 true라면 리스트페이지에 출력되지 않습니다.
   * genre는 nestia sdk를 참고해 enum값만을 가져야합니다.
   * thumbnails는 사용자가 가질 수 있는 이미지들입니다. `index 0의 이미지`가 게임이 가지는 메인이미지입니다.
   *
   * @param gameId
   * @returns
   */
  @Get('/:gameId/data')
  async getData(@Param('gameId') gameId: number) {
    return {
      id: 1,
      title: 'Game Title',
      description: 'Game Description',
      isPrivate: true,
      genre: 'OTHER',
      thumbnails: [
        {
          id: 1,
          url: `https://www.google.com/imgres?q=lol&imgurl=https%3A%2F%2Fcdn1.epicgames.com%2Foffer%2F24b9b5e323bc40eea252a10cdd3b2f10%2FEGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b&imgrefurl=https%3A%2F%2Fstore.epicgames.com%2Fko%2Fp%2Fleague-of-legends&docid=XzNCAy9WkYmi7M&tbnid=RHVexfuwUGmwaM&vet=12ahUKEwiI7YG7k4OHAxVebPUHHXFMDOgQM3oECB0QAA..i&w=2560&h=1440&hcb=2&ved=2ahUKEwiI7YG7k4OHAxVebPUHHXFMDOgQM3oECB0QAA`,
        },
        {
          id: 2,
          url: `https://www.google.com/imgres?q=battleground&imgurl=https%3A%2F%2Fcdn1.epicgames.com%2Fspt-assets%2F53ec4985296b4facbe3a8d8d019afba9%2Fpubg-battlegrounds-1e9a7.jpg&imgrefurl=https%3A%2F%2Fstore.epicgames.com%2Fko%2Fp%2Fpubg-59c1d9&docid=XNRd0HG1OuVLVM&tbnid=daYKOkvfY85WjM&vet=12ahUKEwiEm-6wlIOHAxV0cfUHHRLiAtkQM3oECBQQAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwiEm-6wlIOHAxV0cfUHHRLiAtkQM3oECBQQAA`,
        },
      ],
      createdAt: new Date(),
      counts: {
        pages: 6,
        choices: 10,
        ending: 4,
      },
    };
  }

  /**
   * 게임 전체 불러오기
   *
   * 게임의 유지보수를 위해 게임의 정보 전체를 불러옵니다.
   *
   *
   * 0630 page isEnding 추가
   * @param gameId
   * @returns
   */
  @Get('/:gameId')
  async getAll(@Param('gameId') gameId: number): Promise<GetAllGameResDto> {
    return {
      id: 1,
      title: 'title',
      pages: [
        {
          id: 1,
          abridgement: '요약 1',
          description: '설명 1',
          createdAt: new Date(),
          depth: 1,
          choices: [
            {
              id: 1,
              fromPageId: 1,
              toPageId: 2,
              createdAt: new Date(),
            },
            {
              id: 2,
              fromPageId: 1,
              toPageId: 3,
              createdAt: new Date(),
            },
          ],
        },
        {
          id: 2,
          abridgement: '요약 2',
          description: '설명 2',
          createdAt: new Date(),
          depth: 2,
          choices: [
            {
              id: 3,
              fromPageId: 2,
              toPageId: 4,
              createdAt: new Date(),
            },
            {
              id: 4,
              fromPageId: 3,
              toPageId: 5,
              createdAt: new Date(),
            },
          ],
        },
        {
          id: 3,
          abridgement: '요약 3',
          description: '설명 3',
          createdAt: new Date(),
          depth: 2,
          choices: [
            {
              id: 5,
              fromPageId: 3,
              toPageId: 5,
              createdAt: new Date(),
            },
            {
              id: 6,
              fromPageId: 3,
              toPageId: 6,
              createdAt: new Date(),
            },
          ],
        },
        {
          id: 4,
          abridgement: '요약 4',
          description: '설명 4',
          createdAt: new Date(),
          depth: 3,
          choices: [], // choice가 없다면 ending
        },
        {
          id: 5,

          abridgement: '요약 5',
          description: '설명 5',
          createdAt: new Date(),
          depth: 3,
          choices: [], // choice가 없다면 ending
        },
        {
          id: 6,
          abridgement: '요약 6',
          description: '설명 6',
          createdAt: new Date(),
          depth: 3,
          choices: [], // choice가 없다면 ending
        },
      ],
    };
  }

  /**
   * 게임 생성하기
   *
   * 새로운 게임을 생성합니다.
   *
   * `pageOneContent`를 이용해 게임의 첫 페이지에 들어갈 내용을 설정합니다.
   *
   *
   *
   * @tag Game
   * @summary 🟢(240718)
   */
  @Post()
  async create(
    @Body() createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    return await this.createGameUsecase.excute(1, createGameReqDto);
  }

  /**
   *
   * @tag Game
   */
  @Patch(':gameId')
  async update(
    @Param('gameId') gameId: number,
    @Body() body: UpdateGameReqDto,
  ): Promise<UpdateGameResDto> {
    return {
      id: 1,
      title: 'Updated Game Title',
      description: 'Updated Game Description',
      genre: 'COMIC',
      thumbnailImageUrl: 'https://www.example.com/image.jpg',
      isPrivate: false,
    };
  }

  /**
   *
   * @tag Game
   */
  @Post(':gameId/recommend-image')
  async recommendImage(@Param('gameId') gameId: number): Promise<string> {
    return 'https://www.example.com/image.jpg';
  }
}
