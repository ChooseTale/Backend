import { Inject, Injectable } from '@nestjs/common';
import { IGameService } from '../../domain/ports/input/game.service.interface';

@Injectable()
export class PublishGameUsecase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async excute(gameId: string) {
    // const game = await this.gameService.getGameById(gameId);
  }
}
