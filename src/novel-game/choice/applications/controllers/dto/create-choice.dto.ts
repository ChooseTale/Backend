export class CreateChoiceReqDto {
  parentPageId: number;
  childPageId?: number;
  title: string;
  description: string;
}

export class CreateChoiceResDto {
  id: number;
  title: string;
}
