import { Genres } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetMyBuildedGamesQueryDto {
  @IsEnum(['PUBLISHED', 'BUILDING', 'ALL'])
  @IsNotEmpty()
  status: 'PUBLISHED' | 'BUILDING' | 'ALL';

  @IsNotEmpty()
  @IsEnum(['LATEST', 'OLDEST', 'POPULAR'])
  order: 'LATEST' | 'OLDEST' | 'POPULAR';

  @Transform(({ value }) => value.split(',')) // ,로 구분된 string을 배열로 변환
  @IsString({ each: true })
  genre: (Genres | 'ALL')[];

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  page: number;
}
