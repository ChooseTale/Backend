import { PrismaService } from '@@prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChoiceReqDto } from '../controllers/dto/create-choice.dto';
import { ChoiceService } from '../../services/choice.service';
import { GameService } from '@@src/novel-game/game/services/game-builder/game/game.service';
import { PageService } from '@@src/novel-game/page/services/page.service';

@Injectable()
export class CreateChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly choiceService: ChoiceService,
    private readonly gameService: GameService,
    private readonly pageService: PageService,
  ) {}

  async execute(gameId: number, createChoiceReqDto: CreateChoiceReqDto) {
    return await this.prisma.$transaction(
      async (transaction) => {
        const game = await this.gameService.getById(gameId);
        if (!game) throw new NotFoundException(`game is null`);

        const parentPage = await this.pageService.getOneById(
          createChoiceReqDto.parentPageId,
        );
        if (!parentPage) throw new NotFoundException(`parentPage is null`);

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
