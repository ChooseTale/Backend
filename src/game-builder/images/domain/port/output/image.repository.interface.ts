import { CreateGameThumbnailEntity } from '../../entities/create-game-thumbnail.entity';
import { GameThumbnailDomainEntity } from '../../entities/game-thumnail.entity';

export interface IImageRepository {
  uploadImageForGameThumbnail(
    gameThumbnail: CreateGameThumbnailEntity,
  ): Promise<GameThumbnailDomainEntity>;
  deleteImageGameThumbnail(imageId: number, gameId: number): Promise<void>;
}
