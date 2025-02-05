import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import {
  UpdatePageReqDto,
  UpdatePageResDto,
} from '../controllers/dto/update-page.dto';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';
import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';
import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class UpdatePageUsecase {
  constructor(
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IImageService') private readonly imageService: IImageService,
    private readonly prisma: PrismaService,
  ) {}

  async excute(
    gameId: number,
    pageId: number,
    body: UpdatePageReqDto,
    file: Express.Multer.File,
  ): Promise<UpdatePageResDto> {
    return await this.prisma.$transaction(async (transaction) => {
      const game = await this.gameService.getById(gameId, transaction);
      if (!game) {
        throw new NotFoundException('게임을 찾을 수 없습니다.');
      }

      let backgroundImageId: number | null = null;

      if (file) {
        const uploadedImages = await this.imageService.uploadImageForPage({
          url: `/${file.path}`,
        });
        backgroundImageId = uploadedImages.id;
      }

      const page = await this.pageService.getOneById(pageId, transaction);
      if (!page) {
        throw new NotFoundException('페이지를 찾을 수 없습니다.');
      }

      if (page.gameId !== gameId) {
        throw new BadRequestException('게임과 페이지가 일치하지 않습니다.');
      }

      if (page.isStarting && body.isEnding) {
        throw new BadRequestException(
          '시작 페이지는 종료 페이지가 될 수 없습니다.',
        );
      }

      const updatedPage = await this.pageService.update(
        pageId,
        body,
        backgroundImageId,
        transaction,
      );

      const choices = await this.choiceService.getAllByFromPageId(
        pageId,
        transaction,
      );

      // 선택지 제거 먼저
      const deleteChoices = choices.filter(
        (choice) => !body.choices.some((c) => c.id === choice.id),
      );

      await Promise.all(
        deleteChoices.map((choice) =>
          this.choiceService.delete(choice.id, transaction),
        ),
      );

      await Promise.all(
        body.choices.map((choice) => {
          if (choice.id !== -1) {
            return this.choiceService.update(
              choice.id,
              {
                parentPageId: pageId,
                title: choice.title,
                childPageId: choice.childPageId ?? null,
              },
              transaction,
            );
          }
          if (choice.id === -1) {
            return this.choiceService.create(
              gameId,
              {
                parentPageId: pageId,
                title: choice.title,
                childPageId: choice.childPageId ?? undefined,
              },
              transaction,
            );
          }
        }),
      );

      return {
        id: updatedPage.id,
        title: updatedPage.title,
        isEnding: updatedPage.isEnding,
        contents: updatedPage.contents,
      } as any;
    });
  }
}
