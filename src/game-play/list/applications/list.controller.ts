import { Controller, Get, Query } from '@nestjs/common';
import { GetListReqDto } from './dto/get-list/get-list.req.dto';
import { GetCountReqDto } from './dto/get-count/get-count.req.dto';
import { GetCountResDto } from './dto/get-count/get-count.res.dto';
import { GetListResDto } from './dto/get-list/get-list.res.dto';
import { GetListUsecase } from '../domain/usecases/get-list.usecase';

@Controller('list')
export class ListController {
  constructor(private readonly getListUsecase: GetListUsecase) {}

  /**
   *
   */
  @Get()
  async getList(@Query() query: GetListReqDto): Promise<GetListResDto[]> {
    return this.getListUsecase.execute(
      {
        ...query,
        page: Number(query.page),
        limit: Number(query.limit),
      },
      1,
    );
  }

  async getCount(@Query() query: GetCountReqDto): Promise<GetCountResDto> {
    return {
      count: 1,
    };
  }
}
