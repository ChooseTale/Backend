import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChoiceService } from '../services/choice.service.interface';
import { Prisma } from '@prisma/client';
import {
  UpdateChoiceReqDto,
  UpdateChoiceResDto,
} from '../controllers/dto/update-choice.dto';
import { IGameService } from '@@src/novel-game/game/application/services/game.service.interface';
import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class UpdateChoiceUsecase {
  constructor(
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IGameService') private readonly gameService: IGameService,
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    id: number,
    gameId: number,
    body: UpdateChoiceReqDto,
  ): Promise<UpdateChoiceResDto> {
    return await this.prisma.$transaction(async (transaction) => {
      const game = await this.gameService.getOneById(gameId, transaction);
      if (!game) {
        throw new NotFoundException('Game not found');
      }

      const choice = await this.choiceService.update(id, body, transaction);
      return {
        id: choice.id,
        title: choice.title,
        description: choice.description,
        parentPageId: choice.parentPageId,
        childPageId: choice.childPageId,
      };
    });
  }
}
