import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetMyBuildedGamesQueryDto {
  @IsEnum(['PUBLISHED', 'BUILDING', 'ALL'])
  @IsNotEmpty()
  status: 'PUBLISHED' | 'BUILDING' | 'ALL';

  @IsNotEmpty()
  @IsEnum(['LATEST', 'OLDEST', 'POPULAR'])
  order: 'LATEST' | 'OLDEST' | 'POPULAR';
}
