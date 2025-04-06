import { Inject, Injectable } from '@nestjs/common';
import { GetPlayGameResultDto } from '../../application/dto/res/get-play-game-result.res.dto';

import { ResultComponentPort } from '../../components/port/result.component.port';
import { toGetPlayGameResultMapper } from '../services/mapper/to-get-play-game-result.mapper';

@Injectable()
export class GetPlayGameResultUsecase {
  constructor(
    @Inject('ResultComponent')
    private readonly resultComponent: ResultComponentPort,
  ) {}

  async execute(userId: number, gameId: number): Promise<GetPlayGameResultDto> {
    const getPlayGameResultEntity =
      await this.resultComponent.getPlayGameResultEntity(userId, gameId);
    return toGetPlayGameResultMapper(getPlayGameResultEntity);
  }
}
