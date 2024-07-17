export class CreatePageDomainEntity {
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    public content: string,
    public abridgement: string,
    public gameId: number,
    public isEnding: boolean,
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
