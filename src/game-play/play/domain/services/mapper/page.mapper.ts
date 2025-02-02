import { GetPlayGameScreenDto } from '@@src/game-play/play/applications/dto/get-play-game-screen.dto';
import { PlayPageEntity } from '../../entities/page.entity';

export const mapPageDataToResDto = (
  page: PlayPageEntity,
): GetPlayGameScreenDto['page'] => {
  return {
    id: page.id,
    contents: page.contents,
    choices: page.choices.map((choice) => ({
      id: choice.id,
      title: choice.title,
      description: choice.description,
      toPageId: choice.childPageId,
    })),
    isEnding: page.isEnding,
  };
};
