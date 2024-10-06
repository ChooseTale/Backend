import { Genres } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

// list와 count에서 공통으로 사용하는 속성
export class ListParentDto {
  @IsString()
  @IsOptional()
  genre: Genres | 'ALL';
}
