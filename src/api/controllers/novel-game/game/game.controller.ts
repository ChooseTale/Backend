import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGameReqDto, CreateGameResDto } from './dto/create-game.dto';
import { UpdateGameReqDto, UpdateGameResDto } from './dto/update-game.dto';
import { GetAllGameResDto } from './dto/get-all-game.dto';

@Controller('game')
export class GameController {
  constructor() {}

  /**
   * 게임 전체 불러오기
   *
   * 게임의 유지보수를 위해 게임의 정보 전체를 불러옵니다.
   * choice가 없다면 `엔딩`으로 처리합니다.
   *
   *
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
          createdAt: new Date(),
          depth: 3,
          choices: [], // choice가 없다면 ending
        },
        {
          id: 5,
          abridgement: '요약 5',
          createdAt: new Date(),
          depth: 3,
          choices: [], // choice가 없다면 ending
        },
        {
          id: 6,
          abridgement: '요약 6',
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
   * `title`을 이용해 게임의 제목을 설정합니다.
   * `pageOneContent`를 이용해 게임의 첫 페이지에 들어갈 내용을 설정합니다.
   *  page의 제목은 '제목'으로 생성합니다.
   *
   *
   * @tag Game
   */
  @Post()
  async create(
    @Body() createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    return {
      id: 1,
      page: {
        id: 1,
        title: '페이지의 제목: default 제목',
        content: '첫 페이지의 내용임',
      },
    };
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
