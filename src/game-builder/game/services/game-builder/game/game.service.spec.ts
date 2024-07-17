import { IGameStupRepository } from '@@src/game-builder/game/domain/repositories/game.stub.repository';
import { GameService } from './game.service';
import { CreateGameReqDto } from '@@src/game-builder/game/application/controllers/dto/create-game.dto';

describe('GameService', () => {
  let service: GameService;
  const transaction: any = {};
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
      await service.create(userId, createGameReqDto.title, transaction);
      expect(IGameStupRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
