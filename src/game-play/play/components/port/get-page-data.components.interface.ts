import { PlayPageEntity } from '../../domain/entities/page.entity';

export interface GetPageDataComponentPort {
  getPageEntity(gameId: number, pageId: number): Promise<PlayPageEntity>;
}
