import { Genres } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

// list와 count에서 공통으로 사용하는 속성
export class ListParentDto {
  @Transform(({ value }) => value.split(',')) // ,로 구분된 string을 배열로 변환
  @IsString({ each: true })
  genre: (Genres | 'ALL')[];
}
