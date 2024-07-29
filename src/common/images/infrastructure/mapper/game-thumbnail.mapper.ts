import { Image } from '@prisma/client';
import { GameThumbnailDomainEntity } from '../../domain/entities/game-thumnail.entity';
import { CreateGameThumbnailEntity } from '../../domain/entities/create-game-thumbnail.entity';

export const toCreateEntity = (
  gameThumbnail: CreateGameThumbnailEntity,
): Omit<Image, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> => {
  return {
    url: gameThumbnail.destination,
    gameId: gameThumbnail.gameId,
  };
};

export const toDomainEntity = (image: Image): GameThumbnailDomainEntity => {
  return new GameThumbnailDomainEntity(image.id, image.url, image.gameId);
};
