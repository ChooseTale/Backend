import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsString, Length } from 'class-validator';

export class UpdatePageReqDto {
  @IsString()
  @Length(1, 30)
  title: string;

  @Transform(({ value }) => JSON.parse(value))
  contents: {
    content: string;
  }[];

  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value) === 'true')
  isEnding: boolean;
}

export class UpdatePageResDto {
  id: number;
  title?: string;
  contents: string;
  isEnding: boolean;
}
