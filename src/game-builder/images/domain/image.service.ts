import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IImageService } from './port/input/image.service.interface';
import { IImageRepository } from './port/output/image.repository.interface';
import { GameThumbnailDomainEntity } from './entities/game-thumnail.entity';
import { CreateGameThumbnailEntity } from './entities/create-game-thumbnail.entity';
import { PageImage, Prisma } from '@prisma/client';
import { IPageImageRepository } from '@@src/game-builder/page/domain/ports/output/repositories/page-image.repository.interface';

@Injectable()
export class ImageService implements IImageService {
  constructor(
    @Inject('IImageRepository')
    private readonly imageRepository: IImageRepository,
    @Inject('IPageImageRepository')
    private readonly pageImageRepository: IPageImageRepository,
  ) {}

  async getOneOrThrow(imageId: number): Promise<GameThumbnailDomainEntity> {
    const thumbnail = await this.imageRepository.getOne(imageId);
    if (!thumbnail) {
      throw new NotFoundException('Image not found');
    }
    return thumbnail;
  }

  async getAllByGameId(gameId: number): Promise<GameThumbnailDomainEntity[]> {
    return await this.imageRepository.getAllByGameId(gameId);
  }

  async uploadImageForGameThumbnail(
    gameId: number,
    file: Array<{ url: string }>,
    transaction?: Prisma.TransactionClient,
  ): Promise<GameThumbnailDomainEntity[]> {
    const newGameThumbnails = await Promise.all(
      file.map(async (file) => {
        const gameThumbnail = new CreateGameThumbnailEntity(gameId, file.url);
        return await this.imageRepository.uploadImageForGameThumbnail(
          gameThumbnail,
          transaction,
        );
      }),
    );
    return newGameThumbnails;
  }

  async uploadImageForPage(file: { url: string }): Promise<PageImage> {
    return await this.pageImageRepository.uploadImageForPage(file);
  }

  async deleteImageGameThumbnail(
    imageId: number,
    gameId: number,
  ): Promise<void> {
    await this.imageRepository.deleteImageGameThumbnail(imageId, gameId);
  }
}
