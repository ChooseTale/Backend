import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { GetAllGameResDto } from '../controllers/dto/get-all-game.dto';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';

@Injectable()
export class GetAllGameUsecase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    private readonly prismaService: PrismaService,
  ) {}

  async excute(gameId: number): Promise<GetAllGameResDto> {
    const game = await this.gameService.getById(gameId);
    const pages = await this.pageService.getAllByGameId(gameId);
    const choices = await this.choiceService.getAllByPageIds(
      pages.map((page) => page.id),
    );
  }
}
