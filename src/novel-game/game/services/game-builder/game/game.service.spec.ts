import { IGameStupRepository } from '@@src/novel-game/game/domain/repositories/game.stup.repository';
import { GameService } from './game.service';
import { CreateGameReqDto } from '@@src/novel-game/game/application/controllers/dto/create-game.dto';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    service = new GameService(IGameStupRepository);
  });

  describe('create game', () => {
    const userId: number = 1;
    const createGameReqDto: CreateGameReqDto = {
      title: 'test title',
      pageOneContent: 'test content',
    };
    it('call create', async () => {
      await service.create(userId, createGameReqDto);
      expect(IGameStupRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
