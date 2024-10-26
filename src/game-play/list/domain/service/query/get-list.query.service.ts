import { ListSort } from '@@src/game-play/list/applications/type/list.type';
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

  setSort(sort: ListSort) {
    switch (sort) {
      // 최근 업데이트 된 순서
      case 'LATEST':
        this.query.orderBy = {
          updatedAt: 'desc',
        };
        break;
      // 엔딩에 도달한 플레이 게임 수가 많은 순으로 정렬
      case 'POPULAR':
        this.query.orderBy = {
          PlayGame: {
            _count: 'desc',
          },
        };
        break;
      default:
        throw new Error('Invalid sort');
    }
  }

  setPagenation(page: number, limit: number) {
    this.query.skip = (page - 1) * limit;
    this.query.take = limit;
  }

  setOrder(order: 'LATEST' | 'OLDEST') {
    this.query.orderBy = {
      createdAt: order === 'LATEST' ? 'desc' : 'asc',
    };
  }
}
