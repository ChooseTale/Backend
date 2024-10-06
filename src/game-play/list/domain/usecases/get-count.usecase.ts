import { Inject, Injectable } from '@nestjs/common';
import { PageNationComponentInterface } from '../../components/port/page-nation.component.interface';
import { GetCountQuery } from '../service/query/get-count.query.service';
import { GetCountResDto } from '../../applications/dto/get-count/get-count.res.dto';
import { GetCountReqDto } from '../../applications/dto/get-count/get-count.req.dto';

@Injectable()
export class GetCountUsecase {
  constructor(
    @Inject('PageNationComponent')
    private readonly pageNationComponent: PageNationComponentInterface,
  ) {}

  async execute(query: GetCountReqDto): Promise<GetCountResDto> {
    const { genre } = query;
    const queryService = new GetCountQuery();
    queryService.setGenre(genre);
    const count = await this.pageNationComponent.getCount(
      queryService.getCountQuery(),
    );
    return { count };
  }
}
