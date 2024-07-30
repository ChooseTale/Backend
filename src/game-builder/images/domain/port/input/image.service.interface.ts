import { GameThumbnailDomainEntity } from '../../entities/game-thumnail.entity';

export interface IImageService {
  getOneOrThrow(imageId: number): Promise<GameThumbnailDomainEntity>;
  uploadImageForGameThumbnail(
    gameId: number,
    file: Array<{ url: string }>,
  ): Promise<GameThumbnailDomainEntity[]>;
  deleteImageGameThumbnail(imageId: number, gameId: number): Promise<void>;
}
