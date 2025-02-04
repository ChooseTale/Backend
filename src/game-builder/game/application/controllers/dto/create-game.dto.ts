import { Genres } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateGameReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  description: string;

  @IsNotEmpty()
  @IsEnum(Genres)
  genre: Genres;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  thumbnailFileIdx: number;
}

export class CreateGameResDto {
  id: number;
}
