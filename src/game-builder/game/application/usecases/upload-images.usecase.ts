import { ImageService } from '@@src/common/images/domain/image.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UploadImagesUseCase {
  constructor(
    @Inject('IImageService') private readonly imageService: ImageService,
  ) {}

  async execute(gameId: number, images: Express.Multer.File[]) {
    return this.imageService.uploadImageForGameThumbnail(gameId, images);
  }
}
