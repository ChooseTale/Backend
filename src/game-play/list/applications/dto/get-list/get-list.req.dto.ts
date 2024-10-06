import { Genres } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ListParentDto } from '../list-parent.dto';

export class GetListReqDto extends ListParentDto {
  @IsNumber()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  sort: 'LATEST' | 'POPULAR';
}
