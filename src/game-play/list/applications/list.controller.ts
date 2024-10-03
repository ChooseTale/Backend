import { Controller, Get, Query } from '@nestjs/common';

@Controller('list')
export class ListController {
  //   constructor(private readonly listService: ListService) {}

  /**
   * 
    
   */
  @Get()
  async getList(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('genre') genre: string,
    @Query('sort') sort: string,
  ) {
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
}
