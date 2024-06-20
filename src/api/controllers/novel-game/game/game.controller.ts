import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateGameReqDto, CreateGameResDto } from './dto/create-game.dto';
import { UpdateGameReqDto, UpdateGameResDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
  constructor() {}

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
