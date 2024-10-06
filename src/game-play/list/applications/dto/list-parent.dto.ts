import { Genres } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// list와 count에서 공통으로 사용하는 속성
export class ListParentDto {
  @IsEnum({ ...Genres, ALL: 'ALL' })
  @IsNotEmpty()
  genre: Genres | 'ALL';
}
