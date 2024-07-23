import { PageDomainEntity } from '@@src/game-builder/page/domain/entities/page.entity';
import { GetAllGameResDto } from '../../controllers/dto/get-all-game.dto';
import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { ChoiceDomainEntity } from '@@src/game-builder/choice/domain/entities/choice.entity';

const getPages = (pages: PageDomainEntity[], choices: ChoiceDomainEntity[]) => {
    const result = []

    const startingPage = pages.find((page) => page.isStarting);

    // page와 그 페이지의 초이스
    const getChildPages = (page: PageDomainEntity, pageChoices: ChoiceDomainEntity[]) => {
        const childPages = pageChoices.map((choice) => pages.find((page) => page.id === choice.childPageId));
        return childPages;
    }

    while (1) {

    }
}

export const toGetAllResMapper = (
  game: GameDomainEntity,
  pages: PageDomainEntity[],
    choices: ChoiceDomainEntity[],

): GetAllGameResDto => {
  const depth = 1;
  const startingPage = pages.find((page) => page.isStarting);
  const endingPage = pages.find((page) => page.isEnding);

  const result = {
    id: game.id,
    title: game.title,
    pages:
  };
};
