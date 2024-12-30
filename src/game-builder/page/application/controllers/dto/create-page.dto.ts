import { IsBoolean, IsString, Length } from 'class-validator';

export class CreatePageReqDto {}

export class CreatePageResDto {
  id: number;
  title: string;
}
