import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePageReqDto, CreatePageResDto } from './dto/create-page.dto';
import {
  CheckSpellingByExternalServiceReqDto,
  CheckSpellingByExternalServiceResDto,
} from './dto/check-spelling-by-external-service.dto';
import { RecommendChoiceByGPTResDto } from './dto/recommend-choice-by-GPT.dto';
import { UpdatePageResDto } from './dto/update-page.dto';
import { IPageService } from './services/page.service.interface';

@Controller('/game/:gameId/page')
export class PageController {
  constructor(
    @Inject('IPageService')
    private readonly pageService: IPageService,
  ) {}

  /**
   * 선택지 추천받기
   *
   * `pageId`에 해당하는 페이지의 내용을 이용해 (그리고 이전의 이야기를 이용해) 추천 선택지를 받습니다.
   * response의 title과 description은 선택지의 내용들이며, 사용자가 선택지 생성을 선택하면 다음과 같은 프로세스를 따릅니다.
   * 1. 페이지 생성하기
      -
      고민좀 해볼게요
   * @tag Page
   */
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

  /**
   *
   * 맞춤법 검사하기
   *
   * 카카오 등의 외부 서비스를 이용해 맞춤법을 검사합니다.
   * 원본 텍스트에서 맞춤법이 틀린 부분을 찾아내고, 해당 텍스트를 <color> 태그로 감싸 반환합니다.
   *
   * 0620 카카오의 경우 띄어쓰기 체크는 따로 해줘야 하는데 어떤식으로 할지 고민중
   *
   * @tag Page
   */
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

  /**
   * 페이지 생성하기
   *
   * 새로운 페이지를 생성합니다.
   *
   * @tag Page
   */
  @Post()
  async create(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() body: CreatePageReqDto,
  ): Promise<CreatePageResDto> {
    return {
      id: 1,
    };
  }

  /**
   *
   *  페이지 수정하기
   *
   * 페이지의 제목과 내용을 수정합니다.
   *
   * @tag Page
   */
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

  /**
   *
   *  페이지 삭제하기
   *
   * 페이지를 삭제합니다.
   *
   * @tag Page
   */
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
