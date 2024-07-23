import { PageDomainEntity } from '@@src/game-builder/page/domain/entities/page.entity';
import { GetAllGameResDto } from '../../controllers/dto/get-all-game.dto';
import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { ChoiceDomainEntity } from '@@src/game-builder/choice/domain/entities/choice.entity';

export const toGetAllResMapper = (
  game: GameDomainEntity,
  pages: PageDomainEntity[],
  choices: ChoiceDomainEntity[],
): GetAllGameResDto => {
  const result: any[] = [];
  const startingPage = pages.find((page) => page.isStarting);

  if (!startingPage) {
    throw new Error('Starting page not found');
  }

  const dfs = (page: PageDomainEntity, depth: number) => {
    const childChoices = choices.filter(
      (choice) => choice.parentPageId === page.id,
    );
    const childPages = childChoices.map((c) =>
      pages.find((p) => p.id === c.childPageId),
    ) as PageDomainEntity[];
    result.push({
      ...page,
      depth,
      choices: childChoices,
    });
    childPages.forEach((childPage) => dfs(childPage, depth + 1));
  };

  dfs(startingPage, 1);

  result.sort((a, b) => a.depth - b.depth);

  return {
    id: game.id,
    title: game.title,
    pages: result,
  };
};
