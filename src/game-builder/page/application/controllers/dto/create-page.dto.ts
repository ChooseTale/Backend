import { IsBoolean, IsString, Length } from 'class-validator';

export class CreatePageReqDto {
  @IsBoolean()
  isEnding?: boolean;
  @IsString()
  @Length(1, 3000)
  content: string;
}

export class CreatePageResDto {
  id: number;
}
