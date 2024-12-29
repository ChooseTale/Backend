import { Page } from '@prisma/client';
import { PageDomainEntity } from '../../domain/entities/page.entity';

export const toDomain = (page: Page): PageDomainEntity => {
  const pageDomainEntity = new PageDomainEntity(
    page.id,
    page.content,
    page.title,
    page.gameId,
    page.isStarting,
    page.isEnding,
    page.version,
    page.createdAt,
    page.updatedAt,
  );
  return pageDomainEntity;
};

export const toEntity = (
  page: PageDomainEntity,
): Omit<Page, 'deletedAt' | 'version'> => {
  return {
    id: page.id,
    content: page.content,
    title: page.title,
    gameId: page.gameId,
    isStarting: page.isStarting,
    isEnding: page.isEnding,

    createdAt: page.createdAt ?? new Date(),
    updatedAt: page.updatedAt ?? new Date(),
  };
};

export const toEntityForCreate = (
  page: PageDomainEntity,
): Omit<Page, 'id' | 'deletedAt' | 'version'> => {
  return {
    content: page.content,
    title: page.title,
    gameId: page.gameId,
    isStarting: page.isStarting,
    isEnding: page.isEnding,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
