import { PrismaService } from '@@prisma/prisma.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChoiceReqDto } from '../controllers/dto/create-choice.dto';
import { IChoiceService } from '../../domain/port/input/choice.service.interface';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';
import { UpdateChoiceReqDto } from '../controllers/dto/update-choice.dto';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';

@Injectable()
export class UpdateChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async execute(
    gameId: number,
    choiceId: number,
    createChoiceReqDto: UpdateChoiceReqDto,
  ) {
    const game = await this.gameService.getById(gameId);
    if (!game) throw new NotFoundException(`game is null`);

    const parentPage = await this.pageService.getOneById(
      createChoiceReqDto.parentPageId,
    );
    if (!parentPage) throw new NotFoundException(`parentPage is null`);
    parentPage.checkIsEnding();

    if (createChoiceReqDto.childPageId) {
      const childPage = await this.pageService.getOneById(
        createChoiceReqDto.childPageId,
      );
      if (!childPage) throw new NotFoundException(`childPage is null`);
    }

    const newChoice = await this.choiceService.update(
      choiceId,
      createChoiceReqDto,
    );

    return {
      id: newChoice.id,
      title: newChoice.title,
      description: newChoice.description,
      parentPageId: newChoice.parentPageId,
      childPageId: newChoice.childPageId,
    };
  }
}
