import { Controller, Get, Query } from '@nestjs/common';
import { GetListReqDto } from './dto/get-list/get-list.req.dto';
import { GetCountReqDto } from './dto/get-count/get-count.req.dto';
import { GetCountResDto } from './dto/get-count/get-count.res.dto';
import { GetListResDto } from './dto/get-list/get-list.res.dto';
import { GetListUsecase } from '../domain/usecases/get-list.usecase';
import { GetCountUsecase } from '../domain/usecases/get-count.usecase';

@Controller('list')
export class ListController {
  constructor(
    private readonly getListUsecase: GetListUsecase,
    private readonly getCountUsecase: GetCountUsecase,
  ) {}

  /**
   *
   */
  @Get()
  async getList(@Query() query: GetListReqDto): Promise<GetListResDto[]> {
    return this.getListUsecase.execute(
      {
        ...query,
        page: query.page,
        limit: query.limit,
      },
      1,
    );
  }

  /**
   *
   */
  @Get('count')
  async getCount(@Query() query: GetCountReqDto): Promise<GetCountResDto> {
    return this.getCountUsecase.execute(query);
  }
}
