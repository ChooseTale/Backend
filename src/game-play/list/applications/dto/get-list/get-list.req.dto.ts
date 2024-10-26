import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ListParentDto } from '../list-parent.dto';
import { Type } from 'class-transformer';

export class GetListReqDto extends ListParentDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsString()
  @IsNotEmpty()
  sort: 'LATEST' | 'POPULAR';

  @IsString()
  @IsNotEmpty()
  order: 'LATEST' | 'OLDEST';
}
