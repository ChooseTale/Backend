import { Inject, Injectable } from '@nestjs/common';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { UpdateGameReqDto } from '../controllers/dto/update-game.dto';
import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';

@Injectable()
export class UpdateGameUseCase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IImageService') private readonly imageService: IImageService,
  ) {}

  async execute(
    gameId: number,
    userId: number,
    updateGameReqDto: UpdateGameReqDto,
  ) {
    await this.imageService.getOneOrThrow(updateGameReqDto.thumbnailImageId);

    const updatedGame = await this.gameService.update(
      gameId,
      userId,
      updateGameReqDto,
    );
    return {
      id: updatedGame.id,
      title: updatedGame.title,
      description: updatedGame.description,
      isPrivate: updatedGame.isPrivate,
      genre: updatedGame.genre,
    };
  }
}
