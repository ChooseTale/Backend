import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateChoiceResDto } from './dto/create-choice.dto';
import { DeleteChoiceResDto } from './dto/delete-choice.dto';
import { UpdateChoiceResDto } from './dto/update-choice.dto';

@Controller('/game/:gameId/choice')
export class ChoiceController {
  @Post()
  async create(): Promise<CreateChoiceResDto> {
    return {
      id: 1,
      title: 'Choice Title',
    };
  }

  @Patch(':choiceId')
  async update(
    @Param('choiceId', ParseIntPipe) choiceId: number,
  ): Promise<UpdateChoiceResDto> {
    return {
      id: 1,
      title: 'Updated Title',
      description: 'Updated Description',
      parentPageId: 2,
      childPageId: 3,
    };
  }

  @Delete(':choiceId')
  async delete(
    @Param('choiceId', ParseIntPipe) choiceId: number,
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<DeleteChoiceResDto> {
    return {
      message: 'success',
    };
  }
}
