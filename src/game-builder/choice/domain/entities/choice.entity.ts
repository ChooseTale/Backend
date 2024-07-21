import { UpdateChoiceReqDto } from '../../applications/controllers/dto/update-choice.dto';

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

  updateChoice(updateChoiceReqDto: UpdateChoiceReqDto) {
    this.setTitle(updateChoiceReqDto.title);
    this.setDescription(updateChoiceReqDto.description);
    this.setParentPageId(updateChoiceReqDto.parentPageId);
    this.setChildPageId(updateChoiceReqDto.childPageId);
  }
}
