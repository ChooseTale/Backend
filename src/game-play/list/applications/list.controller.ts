import { Controller, Get, Query } from '@nestjs/common';
import { GetListReqDto } from './dto/get-list/get-list.req.dto';
import { GetCountReqDto } from './dto/get-count/get-count.req.dto';
import { GetCountResDto } from './dto/get-count/get-count.res.dto';
import { GetListResDto } from './dto/get-list/get-list.res.dto';

@Controller('list')
export class ListController {
  //   constructor(private readonly listService: ListService) {}

  /**
   *
   */
  @Get()
  async getList(@Query() query: GetListReqDto): Promise<GetListResDto[]> {
    return [
      {
        game: {
          id: 1,
          title: '게임 제목',
          thumbnail: {
            id: 1,
            url: 'image url',
          },
          genre: 'HORROR',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        publisher: {
          userId: 1,
          nickname: '닉네임',
          profileImage: {
            url: 'image url',
          },
        },
        enrichData: {
          totalEndingCount: 4,
          totalRechedEndingPlayCount: 2,
          expectPlayTime: 4,
          me: {
            isExistReachedEndingPlay: true,
            reachedEndingPlayCount: 1,
            isExistContinuePlay: false,
          },
        },
      },
    ];
  }

  async getCount(@Query() query: GetCountReqDto): Promise<GetCountResDto> {
    return {
      count: 1,
    };
  }
}
