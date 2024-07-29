import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IImageService } from './port/input/image.service.interface';
import { IImageRepository } from './port/output/image.repository.interface';
import { GameThumbnailDomainEntity } from './entities/game-thumnail.entity';
import { CreateGameThumbnailEntity } from './entities/create-game-thumbnail.entity';

@Injectable()
export class ImageService implements IImageService {
  constructor(
    @Inject('IImageRepository')
    private readonly imageRepository: IImageRepository,
  ) {}

  async getOneOrThrow(imageId: number): Promise<GameThumbnailDomainEntity> {
    const thumbnail = await this.imageRepository.getOne(imageId);
    if (!thumbnail) {
      throw new NotFoundException('Image not found');
    }
    return thumbnail;
  }

  async uploadImageForGameThumbnail(
    gameId: number,
    file: Array<{ url: string }>,
  ): Promise<GameThumbnailDomainEntity[]> {
    const newGameThumbnails = await Promise.all(
      file.map(async (file) => {
        const gameThumbnail = new CreateGameThumbnailEntity(gameId, file.url);
        return await this.imageRepository.uploadImageForGameThumbnail(
          gameThumbnail,
        );
      }),
    );
    return newGameThumbnails;
  }

  async deleteImageGameThumbnail(
    imageId: number,
    gameId: number,
  ): Promise<void> {
    await this.imageRepository.deleteImageGameThumbnail(imageId, gameId);
  }
}
