import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChoiceReqDto {
  /**
   * Title of the choice
   */

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  parentPageId: number;

  @IsNumber()
  @IsOptional()
  childPageId: number | null;
}

export class UpdateChoiceResDto {
  id: number;
  title: string;

  parentPageId: number;
  childPageId: number | null;
}
