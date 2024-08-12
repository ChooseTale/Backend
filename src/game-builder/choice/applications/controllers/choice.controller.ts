import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateChoiceReqDto,
  CreateChoiceResDto,
} from './dto/create-choice.dto';
import { DeleteChoiceResDto } from './dto/delete-choice.dto';
import {
  UpdateChoiceReqDto,
  UpdateChoiceResDto,
} from './dto/update-choice.dto';
import { CreateChoiceUseCase } from '../usecases/create-choice.usecase';
import { UpdateChoiceUseCase } from '../usecases/update-choice.usecase';
import { DeleteChoiceUseCase } from '../usecases/delete-choice.usecase';

@Controller('/game/:gameId/choice')
export class ChoiceController {
  constructor(
    private readonly createChoiceUsecase: CreateChoiceUseCase,
    private readonly updateChoiceUsecase: UpdateChoiceUseCase,
    private readonly deleteChoiceUsecase: DeleteChoiceUseCase,
  ) {}

  /**
   *
   * 선택지 생성하기
   *
   * 선택지를 생성하고 parentPageId와 childPageId를 받아 페이지와 연결합니다.
   * childPageId는 null일 수 있습니다.
   *
   * @param gameId 현재 작성중인
   * @tag Choice
   * @summary Create a choice 🟢(240718)
   */
  @Post()
  async create(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() body: CreateChoiceReqDto,
  ): Promise<CreateChoiceResDto> {
    return await this.createChoiceUsecase.execute(gameId, body);
  }

  /**
   * 선택지 수정
   *
   * 선택지의 제목과 설명을 수정합니다.
   * parentPageId와 childPageId를 수정하면 페이지와 연결이 변경됩니다.
   * 클라이언트에서 받은값으로 덮어씌워서 수정합니다. (모든 값 필요)
   *
   * @summary Update a choice 🟢(240812)
   * @tag Choice
   */
  @Put(':choiceId')
  async update(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('choiceId', ParseIntPipe) choiceId: number,
    @Body() body: UpdateChoiceReqDto,
  ): Promise<UpdateChoiceResDto> {
    return await this.updateChoiceUsecase.execute(gameId, choiceId, body);
  }

  /**
   *
   * 선택지 삭제
   * 선택지를 삭제합니다. 연결 된 페이지는 삭제되지 않습니다.
   *
   * @tag Choice
   * @summary Delete a choice 🟢(240812)
   */
  @Delete(':choiceId')
  async delete(
    @Param('choiceId', ParseIntPipe) choiceId: number,
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<DeleteChoiceResDto> {
    return await this.deleteChoiceUsecase.execute(gameId, choiceId);
  }
}
