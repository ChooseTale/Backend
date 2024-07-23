import { PageDomainEntity } from '@@src/game-builder/page/domain/entities/page.entity';
import { GetAllGameResDto } from '../../controllers/dto/get-all-game.dto';
import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { ChoiceDomainEntity } from '@@src/game-builder/choice/domain/entities/choice.entity';

export const toGetAllResMapper = (
  game: GameDomainEntity,
  pages: PageDomainEntity[],
  choices: ChoiceDomainEntity[],
): GetAllGameResDto => {
  const result: GetAllGameResDto['pages'] = [];
  const startingPage = pages.find((page) => page.isStarting);

  const resChoices = choices.map((choice) => ({
    id: choice.id,
    fromPageId: choice.parentPageId,
    toPageId: choice.childPageId,
    createdAt: choice.createdAt,
  }));

  if (!startingPage) {
    throw new Error('Starting page not found');
  }

  const dfs = (page: PageDomainEntity, depth: number) => {
    const childChoices = resChoices.filter(
      (choice) => choice.fromPageId === page.id,
    );
    const childPages = childChoices.map((c) =>
      pages.find((p) => p.id === c.toPageId),
    ) as PageDomainEntity[];
    result.push({
      ...page,
      description: page.content,
      depth,
      choices: childChoices,
    });
    childPages.forEach((childPage) => dfs(childPage, depth + 1));
  };

  dfs(startingPage, 1);

  // 선택지가 연결되지 않은 페이지
  // parentId와 childId가 모두 존재하지 않는 페이지
  const unconnectedPages = pages.filter((page) =>
    choices.every(
      (choice) =>
        choice.parentPageId !== page.id && choice.childPageId !== page.id,
    ),
  );
  for (const page of unconnectedPages) {
    result.push({
      ...page,
      description: page.content,
      depth: -1,
      choices: [],
    });
  }

  result.sort((a, b) => a.depth - b.depth);

  return {
    id: game.id,
    title: game.title,
    pages: result,
  };
};
