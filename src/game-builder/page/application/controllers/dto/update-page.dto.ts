export class UpdatePageReqDto {
  title: string;
  contents: {
    content: string;
  }[];
  isEnding: boolean;
}

export class UpdatePageResDto {
  id: number;
  title?: string;
  contents: string;
  isEnding: boolean;
}
