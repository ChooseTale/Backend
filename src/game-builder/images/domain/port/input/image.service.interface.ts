import { PageImage } from '@prisma/client';
import { GameThumbnailDomainEntity } from '../../entities/game-thumnail.entity';

export interface IImageService {
  getOneOrThrow(imageId: number): Promise<GameThumbnailDomainEntity>;
  getAllByGameId(gameId: number): Promise<GameThumbnailDomainEntity[]>;
  uploadImageForGameThumbnail(
    gameId: number,
    file: Array<{ url: string }>,
  ): Promise<GameThumbnailDomainEntity[]>;
  uploadImageForPage(file: { url: string }): Promise<PageImage>;
  deleteImageGameThumbnail(imageId: number, gameId: number): Promise<void>;
}
