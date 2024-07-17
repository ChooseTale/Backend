export class ChoiceDomainEntity {
  constructor(
    public id: number | null,
    public title: string,
    public description: string,
    public parentPageId: number,
    public childPageId: number | undefined,
    public order: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
