import { IsBoolean, IsString } from 'class-validator';

export class CreatePageReqDto {
  @IsBoolean()
  isEnding?: boolean;
  @IsString()
  content: string;
}

export class CreatePageResDto {
  id: number;
}
