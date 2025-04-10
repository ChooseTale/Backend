import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { GetListReqDto } from './dto/get-list/get-list.req.dto';
import { GetCountReqDto } from './dto/get-count/get-count.req.dto';
import { GetCountResDto } from './dto/get-count/get-count.res.dto';
import { GetListResDto } from './dto/get-list/get-list.res.dto';
import { GetListUsecase } from '../domain/usecases/get-list.usecase';
import { GetCountUsecase } from '../domain/usecases/get-count.usecase';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';

@Controller('list')
@UseGuards(AuthSerializeGuard)
export class ListController {
  constructor(
    private readonly getListUsecase: GetListUsecase,
    private readonly getCountUsecase: GetCountUsecase,
  ) {}

  /**
   * 게임 리스트 조회
   *
   * genre는 ,를 이용해 여러개를 받을 수 있습니다.
   *
   * order는 LATEST, OLDEST, POPULAR를 받을 수 있습니다.
   *
   * @tag Play-Game
   */
  @Get()
  async getList(
    @Query() query: GetListReqDto,
    @Req() req: any,
  ): Promise<GetListResDto[]> {
    return this.getListUsecase.execute(
      {
        ...query,
        page: query.page,
        limit: query.limit,
      },
      req.user.id,
    );
  }

  /**
   * 게임 리스트 카운트 조회
   *
   * @tag Play-Game
   */
  @Get('count')
  async getCount(@Query() query: GetCountReqDto): Promise<GetCountResDto> {
    return this.getCountUsecase.execute(query);
  }
}
