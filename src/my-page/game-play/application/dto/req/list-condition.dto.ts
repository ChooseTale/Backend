import { Genres } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class ListConditionDto {
  @Transform(({ value }) => value.split(',')) // ,로 구분된 string을 배열로 변환
  @IsString({ each: true })
  genre: (Genres | 'ALL')[];
}
