import { Injectable } from '@nestjs/common';
import { GetResultScreenDto } from '../../applications/dto/get-result-screen.dto';
import { GameResultComponent } from '../../components/result.component';

@Injectable()
export class GetResultScreenUsecase {
  constructor(private readonly gameResultComponent: GameResultComponent) {}

  async execute(playId: number, userId: number): Promise<GetResultScreenDto> {
    const result = await this.gameResultComponent.getResultEntity(
      playId,
      userId,
    );

    return result;
  }
}
