import { ListParentQueryService } from './list-parent.query.service';

export class GetListQuery extends ListParentQueryService {
  constructor() {
    super({
      include: {
        PlayGame: {
          where: { endingPageId: { not: null } },
          include: { user: true },
        },
        User: true,
        Page: true,
        thumbnail: true,
      },
    });
  }

  setPagenation(page: number, limit: number) {
    this.query.skip = (page - 1) * limit;
    this.query.take = limit;
  }

  setOrder(order: 'LATEST' | 'OLDEST' | 'POPULAR') {
    switch (order) {
      // 최근 업데이트 된 순서
      case 'LATEST':
        this.query.orderBy = {
          createdAt: 'desc',
        };
        break;
      // 플레이 게임 수가 많은 순으로 정렬
      case 'POPULAR':
        this.query.orderBy = {
          PlayGame: {
            _count: 'desc',
          },
        };
        break;
      // 오래된 순서
      case 'OLDEST':
        this.query.orderBy = {
          createdAt: 'asc',
        };
        break;
      default:
        throw new Error('Invalid sort');
    }
  }
}
