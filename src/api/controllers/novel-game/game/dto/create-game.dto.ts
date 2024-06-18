import { Genres } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameReqDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  genre: Genres;

  thumbnailImageId: number;

  isPrivate: boolean;
}

export class CreateGameResDto {
  id: number;
  title: string;
  description: string;
}
