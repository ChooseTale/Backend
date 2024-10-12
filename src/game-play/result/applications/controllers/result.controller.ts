import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetResultScreenDto } from '../dto/get-result-screen.dto';
import { GetResultScreenUsecase } from '../../domain/usecases/get-result-screen.usecase';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';

@Controller('/result')
@UseGuards(AuthSerializeGuard)
export class ResultController {
  constructor(
    private readonly getResultScreenUsecase: GetResultScreenUsecase,
  ) {}

  /**
   * 게임 결과 화면 조회
   *
   * 게임 결과 화면을 조회하는 API
   *
   * @summary 게임 결과 화면 조회 🟡(240916)
   * @tag Play-Game
   * @param playId
   * @returns
   */
  @Get('/:playId')
  async getResultScreen(
    @Param('playId', ParseIntPipe) playId: number,
    @Req() req: any,
  ): Promise<GetResultScreenDto> {
    return await this.getResultScreenUsecase.execute(playId, req.user.id);
  }
}
