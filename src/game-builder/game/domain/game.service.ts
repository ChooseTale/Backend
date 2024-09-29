import { GameDomainEntity } from '@@src/game-builder/game/domain/entities/game.entity';
import { IGameRepository } from '@@src/game-builder/game/domain/ports/output/repositories/game.repository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IGameService } from './ports/input/game.service.interface';
import { CreateGameDomainEntity } from './entities/create-game.entity';
import { UpdateGameReqDto } from '../application/controllers/dto/update-game.dto';

@Injectable()
export class GameService implements IGameService {
  constructor(
    @Inject('IGameRepository') private readonly gameRepository: IGameRepository,
  ) {}

  async getById(id: number) {
    return await this.gameRepository.getById(id);
  }

  async create(
    userId: number,
    title: string,
    transaction: Prisma.TransactionClient,
  ): Promise<GameDomainEntity> {
    const game = new CreateGameDomainEntity(userId, title);

    const newGame = await this.gameRepository.create(game, transaction);

    return newGame;
  }

  async update(id: number, userId: number, updateGameReqDto: UpdateGameReqDto) {
    const game = await this.gameRepository.getById(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const gameDomainEntity = new GameDomainEntity(
      id,
      updateGameReqDto.title,
      updateGameReqDto.description,
      updateGameReqDto.isPrivate,
      updateGameReqDto.genre,
      updateGameReqDto.thumbnailImageId,
      userId,
      game.createdAt,
      new Date(),
    );

    return await this.gameRepository.update(gameDomainEntity);
  }
}
