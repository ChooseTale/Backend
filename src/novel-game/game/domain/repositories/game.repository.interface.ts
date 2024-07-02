import { GameDomainEntity } from '../entities/game.entity';

export interface IGameRepository {
  create(game: GameDomainEntity): Promise<GameDomainEntity>;
}
