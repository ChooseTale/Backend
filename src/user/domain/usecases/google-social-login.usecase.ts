import { UserComponentInterface } from '@@src/user/components/port/user.component.interface';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleSocialLoginUsecase {
  constructor(
    @Inject('UserComponent')
    private readonly userComponent: UserComponentInterface,
  ) {}

  async execute(token: string): Promise<number> {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;
    let response;
    try {
      response = await axios.get<{
        data: {
          sub: string;
          email: string;
          given_name: string;
          family_name: string;
          picture: string;
          email_verified: boolean;
        };
      }>(url);
    } catch (error) {
      throw new BadRequestException(
        `구글 로그인에 실패했습니다.: ${error.message}`,
      );
    }

    const { email, given_name, family_name, picture } = response.data;
    let user = await this.userComponent.getUserEntityOrNull(email);

    if (!user) {
      const newNickname = await this.userComponent.getNewNickname(
        given_name,
        family_name,
      );
      user = await this.userComponent.createUser(
        response.data.email,
        newNickname,
        response.data.picture,
      );
    }
    return user.id;
  }
}
