import { PrismaService } from '@@prisma/prisma.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChoiceReqDto } from '../controllers/dto/create-choice.dto';
import { IChoiceService } from '../../domain/port/input/choice.service.interface';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';

@Injectable()
export class CreateChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async execute(gameId: number, createChoiceReqDto: CreateChoiceReqDto) {
    const game = await this.gameService.getById(gameId);
    if (!game) throw new NotFoundException(`game is null`);

    const newChoice = await this.choiceService.create(createChoiceReqDto);

    return {
      id: newChoice.id,
      title: newChoice.title,
    };
  }
}
