import { Genres } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CommonListQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsEnum(Genres || 'ALL')
  genre: Genres | 'ALL';

  @IsEnum(['LATEST', 'OLDEST'])
  order: 'LATEST' | 'OLDEST';
}
