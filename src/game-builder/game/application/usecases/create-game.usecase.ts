import {
  CreateGameReqDto,
  CreateGameResDto,
} from '../controllers/dto/create-game.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';

@Injectable()
export class CreateGameUsecase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IImageService') private readonly imageService: IImageService,
    private readonly prismaService: PrismaService,
  ) {}

  async excute(
    userId: number,
    createGameReqDto: CreateGameReqDto,
    imageFiles: Express.Multer.File[],
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
      await this.pageService.create(newGame.id, true, transaction);

      const thumbnailFile = imageFiles[createGameReqDto.thumbnailFileIdx];
      if (!thumbnailFile) {
        throw new BadRequestException('썸네일 이미지가 없습니다.');
      }
      // 썸네일 이미지 업로드
      const uploadedThumbnailImage =
        await this.imageService.uploadImageForGameThumbnail(
          newGame.id,
          [{ url: '/' + thumbnailFile.path }],
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

      // 나머지 게임 이미지 업로드

      await this.imageService.uploadImageForGameThumbnail(
        newGame.id,
        imageFiles
          .filter((file) => file.filename != thumbnailFile.filename)
          .map((file) => ({ url: file.path })),
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
