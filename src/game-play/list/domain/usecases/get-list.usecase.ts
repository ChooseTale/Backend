import { Inject, Injectable } from '@nestjs/common';
import { GetListResDto } from '../../applications/dto/get-list/get-list.res.dto';
import { GetListReqDto } from '../../applications/dto/get-list/get-list.req.dto';
import { GetListQuery } from '../service/query/get-list.query.service';
import { PageNationComponentInterface } from '../../components/port/page-nation.component.interface';
import { ToGetListResMapper } from '../service/mapper/to-get-list-res.mapper';

@Injectable()
export class GetListUsecase {
  constructor(
    @Inject('PageNationComponent')
    private readonly pageNationComponent: PageNationComponentInterface,
  ) {}

  async execute(
    query: GetListReqDto,
    myUserId: number,
  ): Promise<GetListResDto[]> {
    const { page, limit, sort, genre, order } = query;
    const queryService = new GetListQuery();
    queryService.setGenre(genre);
    queryService.setSort(sort);
    queryService.setPagenation(page, limit);
    queryService.setOrder(order);

    const listPageEntity = await this.pageNationComponent.getPageEntity(
      queryService.getQuery(),
    );

    return ToGetListResMapper.toGetListRes(listPageEntity, { id: myUserId });
  }
}
