import {
  CreateGameReqDto,
  CreateGameResDto,
} from '../controllers/dto/create-game.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';

@Injectable()
export class CreateGameUsecase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IImageService') private readonly imageService: IImageService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    private readonly prismaService: PrismaService,
  ) {}

  async excute(
    userId: number,
    createGameReqDto: CreateGameReqDto,
    imageFiles: any,
  ): Promise<CreateGameResDto> {
    return await this.prismaService.$transaction(async (transaction) => {
      const newGame = await this.gameService.create(
        userId,
        createGameReqDto.title,
        createGameReqDto.description,
        createGameReqDto.genre,
        transaction,
      );

      // 새로운 게임을 생성한 뒤 스타팅 페이지 생성
      const startingPage = await this.pageService.create(
        newGame.id,
        true,
        [
          {
            content: `이건 블럭이에요.
게임을 할 때 터치 한번에 노출될 글을 한 블럭에 적으면 돼요.`,
          },
          {
            content: '누르면 삭제 or 수정을 선택할 수 있습니다.',
          },
        ],
        transaction,
      );

      // 새로운 선택지 또한 생성
      await this.choiceService.create(
        newGame.id,
        {
          parentPageId: startingPage.id,
          title: `이건 선택지예요.
플레이어가 선택할 선택지를 최대 4개까지 만들 수 있어요.`,
        },
        transaction,
      );

      await this.choiceService.create(
        newGame.id,
        {
          parentPageId: startingPage.id,
          title: '누르면 삭제 or 수정을 선택할 수 있습니다.',
        },
        transaction,
      );
      const thumbnailFile = imageFiles[createGameReqDto.thumbnailFileIdx];
      if (!thumbnailFile) {
        throw new BadRequestException('썸네일 이미지가 없습니다.');
      }
      // 썸네일 이미지 업로드
      const uploadedThumbnailImage =
        await this.imageService.uploadImageForGameThumbnail(
          newGame.id,
          [{ url: thumbnailFile.key }],
          transaction,
        );
      await this.gameService.update(
        newGame.id,
        userId,
        {
          title: newGame.title,
          description: newGame.description,
          genre: newGame.genre,
          thumbnailImageId: uploadedThumbnailImage[0].id,
          isPrivate: newGame.isPrivate,
        },
        transaction,
      );

      await this.imageService.uploadImageForGameThumbnail(
        newGame.id,
        imageFiles
          .filter((file) => file.originalname != thumbnailFile.originalname)
          .map((file) => ({ url: file.key })),
        transaction,
      );

      // await this.gameService.update(newGame.id, userId, {
      //   thumbnailImageId: uploadedImages[0].id,
      // });

      return {
        id: newGame.id,
      };
    });
  }
}
