import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGameReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 2000)
  pageOneContent: string;
}

export class CreateGameResDto {
  id: number;

  page: {
    id: number;
    title: string;
    content: string;
  };
}
