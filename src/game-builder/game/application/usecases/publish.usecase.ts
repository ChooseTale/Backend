import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';
import { toGetAllResMapper } from './mapper/to-get-all-res.mapper';
import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class PublishGameUsecase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(gameId: number) {
    await this.prisma.$transaction(async (transaction) => {
      const game = await this.gameService.getById(gameId, transaction);
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }
      const pages = await this.pageService.getAllByGameId(gameId, transaction);
      const choices = await this.choiceService.getAllByPageIds(
        pages.map((page) => page.id),
        transaction,
      );
      if (!game) {
        throw new NotFoundException('Game not found');
      }

      const trees = toGetAllResMapper(game, pages, choices);

      let endingCount = 0;

      for (const page of trees.pages) {
        if (page.isEnding && page.depth !== -1) {
          endingCount++;
        }

        const notExistLinkChoice = page.choices.filter(
          (choice) => !choice.toPageId,
        );

        if (
          !page.isEnding &&
          page.fromPageIds.length > 0 &&
          (notExistLinkChoice.length > 0 || page.choices.length < 1)
        ) {
          throw new ConflictException(
            '마지막은 엔딩페이지로 구성되어야합니다!',
          );
        }
      }

      const unConnectedPages = trees.pages.filter(
        (page) => page.fromPageIds.length === 0 && !page.isStarting,
      );

      await Promise.all(
        unConnectedPages.map(async (page) => {
          await this.pageService.delete(page.id, transaction);
        }),
      );

      if (!game.isPrivate) {
        throw new ConflictException('이미 공개된 게임입니다.');
      }

      if (!game.thumbnailId) {
        throw new ConflictException('썸네일 이미지가 없습니다.');
      }

      if (endingCount === 0) {
        throw new ConflictException('연결된 엔딩 페이지가 존재하지 않습니다.');
      }

      await this.gameService.update(
        gameId,
        game.userId,
        {
          title: game.title,
          description: game.description,
          genre: game.genre,
          thumbnailImageId: game.thumbnailId,
          isPrivate: false,
        },
        transaction,
      );
    });
  }
}
