export class CreatePageDomainEntity {
  public createdAt: Date;
  public updatedAt: Date;
  public contents: [];
  public title: string = '';
  public isEnding: boolean = false;
  constructor(
    public gameId: number,
    public isStarting: boolean,
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
