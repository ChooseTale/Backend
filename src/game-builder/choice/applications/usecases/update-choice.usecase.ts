import { PrismaService } from '@@prisma/prisma.service';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IChoiceService } from '../../domain/port/input/choice.service.interface';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';
import { UpdateChoiceReqDto } from '../controllers/dto/update-choice.dto';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { toGetAllResMapper } from '@@src/game-builder/game/application/usecases/mapper/to-get-all-res.mapper';

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
    const pages = await this.pageService.getAllByGameId(gameId);
    const choices = await this.choiceService.getAllByPageIds(
      pages.map((page) => page.id),
    );
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const gameTrees = toGetAllResMapper(game, pages, choices);

    const parentPage = gameTrees.pages.find(
      (page) => page.id === createChoiceReqDto.parentPageId,
    );

    if (!parentPage) throw new NotFoundException(`parentPage is null`);

    const pageChoice = await this.choiceService.getAllByToPageId(parentPage.id);

    if (pageChoice.length < 1) {
      throw new ConflictException(
        '부모 페이지가 없으면 선택지를 만들 수 없습니다.',
      );
    }

    if (parentPage.isEnding) {
      throw new ConflictException('종료 페이지는 선택지를 만들 수 없습니다.');
    }

    if (
      createChoiceReqDto.childPageId &&
      parentPage.fromPageIds.includes(createChoiceReqDto.childPageId)
    ) {
      throw new ConflictException(
        '자식 페이지는 부모 페이지가 될 수 없습니다.',
      );
    }

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
