import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class Choice {
  id: number;
  @IsString()
  @Length(1, 20)
  title: string;
  childPageId: number | null;
}

export class UpdatePageReqDto {
  @IsString()
  @Length(1, 30)
  title: string;

  @Transform(({ value }) => JSON.parse(value))
  contents: {
    content: string;
  }[];

  @IsBoolean()
  @Transform(({ value }) => {
    return JSON.parse(value) == true;
  })
  isEnding: boolean;

  @ValidateNested({ each: true })
  @Transform(({ value }) => JSON.parse(value))
  choices: Choice[];
}

export class UpdatePageResDto {
  id: number;
  title?: string;
  contents: string;
  isEnding: boolean;
}
