import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { GetDataGameResDto } from '../../controllers/dto/get-data-game.dto';
import { PageDomainEntity } from '@@src/game-builder/page/domain/entities/page.entity';
import { ChoiceDomainEntity } from '@@src/game-builder/choice/domain/entities/choice.entity';

export const toGetDataRes = (
  game: GameDomainEntity,
  pages: PageDomainEntity[],
  choices: ChoiceDomainEntity[],
): GetDataGameResDto => {
  return {
    id: game.id,
    title: game.title,
    description: game.description,
    isPrivate: game.isPrivate,
    genre: game.genre,
    createdAt: game.createdAt,
    thumbnails: [
      {
        id: 1,
        url: 'https://www.google.com/imgres?q=lol&imgurl=https%3A%2F%2Fcdn1.epicgames.com%2Foffer%2F24b9b5e323bc40eea252a10cdd3b2f10%2FEGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b&imgrefurl=https%3A%2F%2Fstore.epicgames.com%2Fko%2Fp%2Fleague-of-legends&docid=XzNCAy9WkYmi7M&tbnid=RHVexfuwUGmwaM&vet=12ahUKEwiI7YG7k4OHAxVebPUHHXFMDOgQM3oECB0QAA..i&w=2560&h=1440&hcb=2&ved=2ahUKEwiI7YG7k4OHAxVebPUHHXFMDOgQM3oECB0QAA',
      },
      {
        id: 2,
        url: 'https://www.google.com/imgres?q=battleground&imgurl=https%3A%2F%2Fcdn1.epicgames.com%2Fspt-assets%2F53ec4985296b4facbe3a8d8d019afba9%2Fpubg-battlegrounds-1e9a7.jpg&imgrefurl=https%3A%2F%2Fstore.epicgames.com%2Fko%2Fp%2Fpubg-59c1d9&docid=XNRd0HG1OuVLVM&tbnid=daYKOkvfY85WjM&vet=12ahUKEwiEm-6wlIOHAxV0cfUHHRLiAtkQM3oECBQQAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwiEm-6wlIOHAxV0cfUHHRLiAtkQM3oECBQQAA',
      },
    ],
    counts: {
      pages: pages.length,
      choices: choices.length,
      ending: pages.filter((page) => page.isEnding).length,
    },
  };
};
