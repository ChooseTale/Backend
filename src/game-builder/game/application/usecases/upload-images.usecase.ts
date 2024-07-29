import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UploadImagesUseCase {
  constructor(
    @Inject('IImageService') private readonly imageService: IImageService,
  ) {}

  async execute(gameId: number, images: Express.Multer.File[]) {
    return this.imageService.uploadImageForGameThumbnail(gameId, images);
  }
}
