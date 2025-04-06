import { ChoicePage } from '@prisma/client';
import { ChoiceDomainEntity } from '../../domain/entities/choice.entity';

export const toDomain = (choice: ChoicePage): ChoiceDomainEntity => {
  return new ChoiceDomainEntity(
    choice.id,
    choice.title,
    choice.fromPageId,
    choice.toPageId,
    choice.order,
    choice.createdAt,
    choice.updatedAt,
  );
};

export const toEntity = (
  gameId: number,
  choice: ChoiceDomainEntity,
): Omit<ChoicePage, 'deletedAt'> => {
  return {
    id: choice.id,
    title: choice.title,
    fromPageId: choice.parentPageId,
    toPageId: choice.childPageId,
    order: choice.order,
    gameId,
    createdAt: choice.createdAt,
    updatedAt: choice.updatedAt,
  };
};
