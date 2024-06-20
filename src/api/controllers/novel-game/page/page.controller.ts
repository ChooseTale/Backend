import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePageResDto } from './dto/create-page.dto';
import {
  CheckSpellingByExternalServiceReqDto,
  CheckSpellingByExternalServiceResDto,
} from './dto/check-spelling-by-external-service.dto';
import { RecommendChoiceByGPTResDto } from './dto/recommend-choice-by-GPT.dto';
import { UpdatePageResDto } from './dto/update-page.dto';

@Controller('/game/:gameId/page')
export class PageController {
  @Get(':pageId/recommend-choices')
  async recommendChoicesByExternalService(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
  ): Promise<RecommendChoiceByGPTResDto[]> {
    return [
      {
        title: 'Recommend Choice Title1',
        description: 'Recommend Choice Description1',
      },
      {
        title: 'Recommend Choice Title2',
        description: 'Recommend Choice Description2',
      },
      {
        title: 'Recommend Choice Title3',
        description: 'Recommend Choice Description3',
      },
    ];
  }

  //
  @Post('/check-spelling')
  async checkSpellingByExternalService(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() body: CheckSpellingByExternalServiceReqDto,
  ): Promise<CheckSpellingByExternalServiceResDto> {
    // req : 이게 맛는 맞춤뻡
    return {
      text: '이게 <color>맞는</color> <color>맞춤법</color>',
    };
  }

  @Post()
  async create(
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<CreatePageResDto> {
    return {
      id: 1,
    };
  }

  @Patch('/:pageId')
  async update(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
  ): Promise<UpdatePageResDto> {
    return {
      id: 1,
      title: 'Updated Page Title',
      content: 'Updated Page Content',
    };
  }

  @Delete('/:pageId')
  async delete(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('pageId', ParseIntPipe) pageId: number,
  ): Promise<{ message: string }> {
    return {
      message: 'success',
    };
  }
}
