import { Genres } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGameReqDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  genre: Genres;

  @Type(() => Number)
  thumbnailImageId: number;

  isPrivate: boolean;
}

export class UpdateGameResDto {
  id: number;
  title: string;
  description: string;
  genre: Genres;
  thumbnailImageUrl: string | null;
  isPrivate: boolean;
}
