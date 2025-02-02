import { Page } from '@prisma/client';
import { PageDomainEntity } from '../../domain/entities/page.entity';

export const toDomain = (page: Page): PageDomainEntity => {
  const pageDomainEntity = new PageDomainEntity(
    page.id,
    page.contents as { content: string }[],
    page.title,
    page.gameId,
    page.isStarting,
    page.isEnding,
    page.version,
    page.createdAt,
    page.updatedAt,
    page.backgroundImageId,
  );
  return pageDomainEntity;
};

export const toEntity = (
  page: PageDomainEntity,
): Omit<Page, 'deletedAt' | 'version'> => {
  return {
    id: page.id,
    contents: page.contents as { content: string }[],
    title: page.title,
    gameId: page.gameId,
    isStarting: page.isStarting,
    isEnding: page.isEnding,
    backgroundImageId: page.backgroundImageId,
    createdAt: page.createdAt ?? new Date(),
    updatedAt: page.updatedAt ?? new Date(),
  };
};

export const toEntityForCreate = (
  page: PageDomainEntity,
): Omit<Page, 'id' | 'deletedAt' | 'version'> => {
  return {
    contents: page.contents as { content: string }[],
    title: page.title,
    gameId: page.gameId,
    isStarting: page.isStarting,
    isEnding: page.isEnding,
    backgroundImageId: page.backgroundImageId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
