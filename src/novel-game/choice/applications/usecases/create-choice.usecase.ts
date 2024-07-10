import { PrismaService } from '@@prisma/prisma.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChoiceReqDto } from '../controllers/dto/create-choice.dto';
import { ChoiceService } from '../../services/choice.service';
import { GameService } from '@@src/novel-game/game/services/game-builder/game/game.service';
import { IPageService } from '@@src/novel-game/page/application/services/page.service.interface';
import { IChoiceService } from '../services/choice.service.interface';
import { IGameService } from '@@src/novel-game/game/application/services/game.service.interface';

@Injectable()
export class CreateChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  async execute(gameId: number, createChoiceReqDto: CreateChoiceReqDto) {
    return await this.prisma.$transaction(
      async (transaction) => {
        const game = await this.gameService.getOneById(gameId, transaction);
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
