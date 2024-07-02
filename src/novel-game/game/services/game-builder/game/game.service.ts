import { CreateGameReqDto } from '@@src/novel-game/game/application/controllers/dto/create-game.dto';
import { GameDomainEntity } from '@@src/novel-game/game/domain/entities/game.entity';
import { IGameRepository } from '@@src/novel-game/game/domain/repositories/game.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  constructor(
    @Inject('IGameRepository') private readonly gameRepository: IGameRepository,
  ) {}

  async create(userId: number, createGameReqDto: CreateGameReqDto) {
    const newGame = new GameDomainEntity(
      null,
      createGameReqDto.title,
      '',
      true,
      'OTHER',
      null,
      userId,
      new Date(),
      new Date(),
    );
    await this.gameRepository.create(newGame);
  }
}
