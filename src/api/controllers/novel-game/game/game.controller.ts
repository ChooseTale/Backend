import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateGameReqDto, CreateGameResDto } from './dto/create-game.dto';

@Controller('game')
export class GameController {
  constructor() {}

  @Post()
  async create(
    @Body() createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    return {
      id: 1,
      title: 'Game Title',
      description: 'Game Description',
    };
  }

  @Patch(':gameId')
  async update(
    @Param('gameId') gameId: number,
    @Body() updateGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    return {
      id: 1,
      title: 'Updated Game Title',
      description: 'Updated Game Description',
    };
  }

  @Post(':gameId/recommend-image')
  async recommendImage(@Param('gameId') gameId: number): Promise<string> {
    return 'https://www.example.com/image.jpg';
  }
}
