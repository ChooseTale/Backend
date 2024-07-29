import { Inject, Injectable } from '@nestjs/common';
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

  async uploadImageForGameThumbnail(
    gameId: number,
    file: Array<Express.Multer.File>,
  ): Promise<GameThumbnailDomainEntity[]> {
    const newGameThumbnails = await Promise.all(
      file.map(async (file) => {
        const gameThumbnail = new CreateGameThumbnailEntity(gameId, file);
        return await this.imageRepository.uploadImageForGameThumbnail(
          gameThumbnail,
        );
      }),
    );
    return newGameThumbnails;
  }
}
