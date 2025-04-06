import { UpdateChoiceReqDto } from '../../applications/controllers/dto/update-choice.dto';

export class ChoiceDomainEntity {
  constructor(
    public id: number,
    public title: string,
    public parentPageId: number,
    public childPageId: number | null,
    public order: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  setTitle(title: string) {
    this.title = title;
  }

  setParentPageId(parentPageId: number) {
    this.parentPageId = parentPageId;
  }

  setChildPageId(childPageId: number | null) {
    this.childPageId = childPageId;
  }

  setOrder(order: number) {
    this.order = order;
  }

  updateChoice(updateChoiceReqDto: UpdateChoiceReqDto) {
    this.setTitle(updateChoiceReqDto.title);
    this.setChildPageId(updateChoiceReqDto.childPageId);
  }
}
