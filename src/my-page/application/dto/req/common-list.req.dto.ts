import { Genres } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommonListQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @Transform(({ value }) => value.split(',')) // ,로 구분된 string을 배열로 변환
  @IsString({ each: true })
  genre: (Genres | 'ALL')[];

  @IsEnum(['LATEST', 'OLDEST'])
  order: 'LATEST' | 'OLDEST';
}
