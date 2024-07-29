import { GameThumbnailDomainEntity } from '../../entities/game-thumnail.entity';

export interface IImageService {
  uploadImageForGameThumbnail(
    gameId: number,
    file: Array<Express.Multer.File>,
  ): Promise<GameThumbnailDomainEntity[]>;
}
