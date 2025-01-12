import { IsBoolean, IsString, Length } from 'class-validator';

export class UpdatePageReqDto {
  @IsString()
  @Length(1, 30)
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
