import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateChoiceReqDto } from '../controllers/dto/create-choice.dto';
import { ChoiceService } from '../../services/choice.service';
import { GameService } from '@@src/novel-game/game/services/game-builder/game/game.service';

@Injectable()
export class CreateChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly choiceService: ChoiceService,
    private readonly gameService: GameService,
  ) {}

  async execute(gameId: number, createChoiceReqDto: CreateChoiceReqDto) {
    await this.prisma.$transaction(async (transaction) => {
      const game = await this.gameService.getById(gameId);
    });
  }
}
