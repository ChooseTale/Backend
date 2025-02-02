import { Genres } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

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
}

export class CreateGameResDto {
  id: number;
}
