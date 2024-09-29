import { IsString } from 'class-validator';

export class CheckSpellingByExternalServiceReqDto {
  @IsString()
  text: string;
}

export class CheckSpellingByExternalServiceResDto {
  text: string;
}
