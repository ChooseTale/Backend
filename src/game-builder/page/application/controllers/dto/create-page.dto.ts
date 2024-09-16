import { IsBoolean, IsString, Length } from 'class-validator';

export class CreatePageReqDto {
  @IsBoolean()
  isEnding?: boolean = false;
  @IsString()
  @Length(1, 3000)
  content: string;
}

export class CreatePageResDto {
  id: number;
  abridgement: string;
  content: string;
  
}
