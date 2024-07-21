export class UpdatePageReqDto {
  abridgement: string;
  content: string;
  isEnding: boolean;
}

export class UpdatePageResDto {
  id: number;
  abridgement?: string;
  content: string;
  isEnding: boolean;
}
