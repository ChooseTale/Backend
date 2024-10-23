import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { GetDataGameResDto } from '../../controllers/dto/get-data-game.dto';
import { PageDomainEntity } from '@@src/game-builder/page/domain/entities/page.entity';
import { ChoiceDomainEntity } from '@@src/game-builder/choice/domain/entities/choice.entity';
import { GameThumbnailDomainEntity } from '@@src/game-builder/images/domain/entities/game-thumnail.entity';
import { getImagePath } from '@@src/common/components/images/get-path.component';

export const toGetDataRes = (
  game: GameDomainEntity,
  pages: PageDomainEntity[],
  choices: ChoiceDomainEntity[],
  images: GameThumbnailDomainEntity[],
): GetDataGameResDto => {
  const thumbnails = images
    .filter((image) => image.id !== game.thumbnailId)
    .map((image) => ({
      id: image.id,
      url: getImagePath(image.url),
    }));

  if (game.thumbnailId) {
    const thumbnail = images.find((image) => image.id === game.thumbnailId);
    if (thumbnail) {
      thumbnails.unshift({
        id: thumbnail.id,
        url: thumbnail.url,
      });
    }
  }
  return {
    id: game.id,
    title: game.title,
    description: game.description,
    isPrivate: game.isPrivate,
    genre: game.genre,
    createdAt: game.createdAt,
    thumbnails,
    counts: {
      pages: pages.length,
      choices: choices.length,
      ending: pages.filter((page) => page.isEnding).length,
    },
  };
};
