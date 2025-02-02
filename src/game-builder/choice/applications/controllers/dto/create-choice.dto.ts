import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChoiceReqDto {
  @IsNotEmpty()
  @Type(() => Number)
  parentPageId: number;

  @Type(() => Number)
  childPageId?: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  title: string;

  // @IsNotEmpty()
  // @IsString()
  // @Length(1, 200)
  // description: string;
}

export class CreateChoiceResDto {
  id: number;
  title: string;
}
