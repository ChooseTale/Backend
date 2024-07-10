interface UpdateChoiceInterface {
  title: string;
  description: string;
  parentPageId: number;
  childPageId: number | null;
  order: number;
}

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

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setParentPageId(parentPageId: number) {
    this.parentPageId = parentPageId;
  }

  setChildPageId(childPageId: number | null) {
    this.childPageId = childPageId;
  }
}
