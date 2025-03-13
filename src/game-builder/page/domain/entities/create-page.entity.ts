export class CreatePageDomainEntity {
  public createdAt: Date;
  public updatedAt: Date;
  public contents: [];
  public title: string = '새 페이지';
  public isEnding: boolean = false;
  constructor(
    public gameId: number,
    public isStarting: boolean,
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
