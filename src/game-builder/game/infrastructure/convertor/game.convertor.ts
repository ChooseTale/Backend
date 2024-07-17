import { Game } from '@prisma/client';
import { GameDomainEntity } from '../../domain/entities/game.entity';

export const toDomain = (game: Game): GameDomainEntity => {
  const gameDomainEntity = new GameDomainEntity(
    game.id,
    game.title,
    game.description,
    game.isPrivate,
    game.genre,
    game.thumbnailId,
    game.userId,
    game.createdAt,
    game.updatedAt,
  );
  return gameDomainEntity;
};

export const toEntityForCreate = (
  game: GameDomainEntity,
): Omit<Game, 'id' | 'deletedAt'> => {
  return {
    title: game.title,
    description: game.description,
    isPrivate: game.isPrivate,
    genre: game.genre,
    thumbnailId: game.thumbnailId,
    userId: game.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
