export class ChoiceDomainEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public parentPageId: number,
    public childPageId: number | null,
    public order: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
