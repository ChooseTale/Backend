import { Genres } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ListConditionDto } from './list-condition.dto';

export class CommonListQueryDto extends ListConditionDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsEnum(['LATEST', 'OLDEST'])
  order: 'LATEST' | 'OLDEST';
}
