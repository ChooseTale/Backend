import { IsBoolean, IsString, Length } from 'class-validator';

export class CreatePageReqDto {}

export class CreatePageResDto {
  id: number;

  @IsString()
  @Length(1, 30)
  title: string;
}
