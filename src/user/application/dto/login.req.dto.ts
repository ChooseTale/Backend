import { IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  type: 'google';
}
