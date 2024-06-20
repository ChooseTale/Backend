import { Genres } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameReqDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  pageOneContent: string;
}

export class CreateGameResDto {
  id: number;

  page: {
    id: number;
    title: string;
    content: string;
  };
}
