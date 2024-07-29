import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteGameUseCase {
  constructor(
    @Inject('IImageService') private readonly imageService: IImageService,
  ) {}

  async execute(imageId: number, gameId: number): Promise<void> {
    await this.imageService.deleteImageGameThumbnail(imageId, gameId);
  }
}
