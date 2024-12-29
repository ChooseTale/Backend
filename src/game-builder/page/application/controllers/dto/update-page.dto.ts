export class UpdatePageReqDto {
  title: string;
  content: string;
  isEnding: boolean;
}

export class UpdatePageResDto {
  id: number;
  title?: string;
  content: string;
  isEnding: boolean;
}
