import { PageDomainEntity } from '../entities/page.entity';

export interface IPageRepository {
  create(page: PageDomainEntity): Promise<PageDomainEntity>;
}
