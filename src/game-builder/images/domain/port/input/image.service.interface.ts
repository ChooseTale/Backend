import { GameThumbnailDomainEntity } from '../../entities/game-thumnail.entity';

export interface IImageService {
  uploadImageForGameThumbnail(
    gameId: number,
    file: Array<{ url: string }>,
  ): Promise<GameThumbnailDomainEntity[]>;
  deleteImageGameThumbnail(imageId: number, gameId: number): Promise<void>;
}
