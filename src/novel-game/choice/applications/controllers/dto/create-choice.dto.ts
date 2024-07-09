import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChoiceReqDto {
  @IsNotEmpty()
  @Type(() => Number)
  parentPageId: number;

  @Type(() => Number)
  childPageId?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateChoiceResDto {
  id: number;
  title: string;
}
