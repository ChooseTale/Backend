import { IsString, MaxLength } from 'class-validator';

export class UpdateBlockReqDto {
  @IsString()
  @MaxLength(2000, { each: true })
  contents: {
    content: string;
  }[];
}

export class UpdateBlockResDto {
  id: number;
  contents: {
    content: string;
  }[];
}
