import { ChoicePage } from '@prisma/client';
import { ChoiceDomainEntity } from '../../domain/entities/choice.entity';

export const toDomain = (choice: ChoicePage): ChoiceDomainEntity => {
  return new ChoiceDomainEntity(
    choice.id,
    choice.title,
    choice.description,
    choice.fromPageId,
    choice.toPageId,
    choice.order,
    choice.createdAt,
    choice.updatedAt,
  );
};

export const toEntity = (
  choice: ChoiceDomainEntity,
): Omit<ChoicePage, 'deletedAt'> => {
  return {
    id: choice.id,
    title: choice.title,
    description: choice.description,
    fromPageId: choice.parentPageId,
    toPageId: choice.childPageId,
    order: choice.order,
    createdAt: choice.createdAt,
    updatedAt: choice.updatedAt,
  };
};
