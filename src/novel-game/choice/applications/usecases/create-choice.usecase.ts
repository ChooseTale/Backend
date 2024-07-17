import { PrismaService } from '@@prisma/prisma.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChoiceReqDto } from '../controllers/dto/create-choice.dto';
import { ChoiceService } from '../../services/choice.service';
import { GameService } from '@@src/novel-game/game/services/game-builder/game/game.service';
import { IPageService } from '@@src/novel-game/page/application/services/page.service.interface';

@Injectable()
export class CreateChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly choiceService: ChoiceService,
    private readonly gameService: GameService,
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  async execute(gameId: number, createChoiceReqDto: CreateChoiceReqDto) {
    return await this.prisma.$transaction(
      async (transaction) => {
        const game = await this.gameService.getById(gameId);
        if (!game) throw new NotFoundException(`game is null`);

        const newChoice = await this.choiceService.create(
          createChoiceReqDto,
          transaction,
        );

        return {
          id: newChoice.id,
          title: newChoice.title,
        };
      },
      { isolationLevel: 'RepeatableRead' },
    );
  }
}
