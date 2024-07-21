import { PrismaService } from '@@prisma/prisma.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChoiceService } from '../../domain/port/input/choice.service.interface';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';

@Injectable()
export class DeleteChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async execute(gameId: number, choiceId: number) {
    await this.prisma.$transaction(async (transaction) => {
      const game = await this.gameService.getById(gameId, transaction);
      if (!game) throw new NotFoundException(`game is null`);

      await this.choiceService.delete(choiceId, transaction);
    });

    return {
      message: 'success',
    };
  }
}
