import { Prisma } from '@prisma/client';
import { CreateGameThumbnailEntity } from '../../entities/create-game-thumbnail.entity';
import { GameThumbnailDomainEntity } from '../../entities/game-thumnail.entity';

export interface IImageRepository {
  getOne(imageId: number): Promise<GameThumbnailDomainEntity | null>;
  getAllByGameId(gameId: number): Promise<GameThumbnailDomainEntity[]>;
  uploadImageForGameThumbnail(
    gameThumbnail: CreateGameThumbnailEntity,
    transaction?: Prisma.TransactionClient,
  ): Promise<GameThumbnailDomainEntity>;
  deleteImageGameThumbnail(imageId: number, gameId: number): Promise<void>;
}
