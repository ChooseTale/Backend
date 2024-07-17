import { PageDomainEntity } from './page.entity';

export class PageStubEntity extends PageDomainEntity {
  public id: number;

  static checkIsEnding(): void {
    return;
  }
}
