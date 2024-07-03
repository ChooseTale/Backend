export class PageDomainEntity {
  constructor(
    public id: number,
    public content: string,
    public abridgement: string,
    public gameId: number,
    public isEnding: boolean,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}
}
