import { Body, Controller, Post } from '@nestjs/common';
import { CreateGameReqDto, CreateGameResDto } from './dto/create-game.dto';

@Controller('game')
export class GameController {
  private id: number = 1;
  private db: any = [];
  constructor() {}

  @Post()
  async create(
    @Body() createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    const game = {
      id: this.id++,
      ...createGameReqDto,
    };
    this.db.push(game);
    return game;
  }
}
