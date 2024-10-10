import { UserComponentInterface } from '@@src/user/components/port/user.component.interface';

import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleSocialLoginUsecase {
  constructor(
    @Inject('UserComponent')
    private readonly userComponent: UserComponentInterface,
  ) {}

  async execute(token: string): Promise<number> {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;
    const response: {
      data: {
        sub: string;
        email: string;
        given_name: string;
        family_name: string;
        picture: string;
        email_verified: boolean;
      };
    } = await axios.get(url);
    const { sub, email, given_name, family_name, picture, email_verified } =
      response.data;
    let user = await this.userComponent.getUserEntityOrNull(email);
    const newNickname = await this.userComponent.getNewNickname(
      given_name,
      family_name,
    );

    if (!user) {
      user = await this.userComponent.createUser(
        response.data.email,
        newNickname,
        response.data.picture,
      );
    }
    return user.id;
  }
}
