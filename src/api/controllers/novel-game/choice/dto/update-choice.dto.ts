export class UpdateChoiceReqDto {
  title: string;
  description: string;
  parentPageId: number;
  childPageId: number;
}

export class UpdateChoiceResDto {
  id: number;
  title: string;
  description: string;
  parentPageId: number;
  childPageId: number;
}
