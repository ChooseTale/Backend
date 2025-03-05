import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginReqDto } from './dto/login.req.dto';
import { GoogleSocialLoginUsecase } from '../domain/usecases/google-social-login.usecase';
import { GetMeUsecase } from '../domain/usecases/get-me.usecase';
import { MeResDto } from './dto/me.res.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';
import { UpdateUserUsecase } from '../domain/usecases/update-user.usecase';
import { LoginResDto } from './dto/login.res.dto';
import { DeleteUserUsecase } from '../domain/usecases/delete-user.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly googleSocialLoginUsecase: GoogleSocialLoginUsecase,
    private readonly getMeUsecase: GetMeUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly deleteUserUsecase: DeleteUserUsecase,
  ) {}

  /**
   * 내 정보 조회
   *
   * 세션에 저장된 유저의 정보를 조회합니다.
   *
   * @tag User
   * @summary  내 정보 조회
   * @param request
   * @returns
   */
  @Get('/me')
  @UseGuards(AuthSerializeGuard)
  async getMe(@Req() request: any): Promise<MeResDto> {
    const userId = request.user.id;
    const meEntity = await this.getMeUsecase.execute(userId);
    return meEntity;
  }

  /**
   * 소셜 로그인
   *
   * type에 해당하는 소셜 로그인을 진행합니다.
   * 로그인 이후, 세션을 생성해 유저의 로그인 정보를 저장합니다.
   * 클라이언트에서는 이후 요청을 보낼 때 세션을 같이 보내게됩니다.
   * 쿠키에 세션의 유무에 따라 로그인 여부를 판달할 수 있습니다.
   * @tag User
   * @param body
   * @param request
   * @summary 🟡(241010) 소셜 로그인
   * @returns
   */
  @Post('/login')
  async login(
    @Body() body: LoginReqDto,
    @Req() request: any,
  ): Promise<LoginResDto> {
    let userInfo: {
      userId: number;
      isFirstLogin: boolean;
    };

    switch (body.type) {
      case 'google': {
        userInfo = await this.googleSocialLoginUsecase.execute(body.token);
        break;
      }
      default: {
        throw new Error('Invalid type');
      }
    }

    request.session.userId = userInfo.userId;
    request.session.type = body.type;

    return {
      message: `success login userId: ${userInfo.userId}`,
      isFirstLogin: userInfo.isFirstLogin,
    };
  }

  /**
   * 로그아웃
   *
   * 세션을 삭제합니다.
   *
   * @tag User
   * @summary 🟡(240812) 로그아웃
   * @returns
   */
  @Get('/logout')
  async logout(@Req() request: any) {
    request.session.destroy();
    return {
      message: 'success logout',
    };
  }

  /**
   * 유저 정보 수정
   *
   * 유저의 닉네임과 프로필 이미지를 수정합니다.
   *
   * 이미지파일은 jpeg, png, gif 형식만 허용합니다.
   * image key를 가집니다.
   *
   * 그 외의 값은 formdata text형식으로 보내주시면 됩니다.
   *
   *
   * @tag User
   * @summary 🟡(241022) 유저 정보 수정
   * @param request
   * @param image
   * @param body
   * @returns
   */
  @Patch('/')
  @UseGuards(AuthSerializeGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(
    @Req() request: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /jpeg|png|gif|webp|jpg/ }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Body()
    body: {
      nickname: string;
    },
  ) {
    const userId = request.user.id;

    const updatedUser = await this.updateUserUsecase.execute(
      userId,
      body,
      image,
    );
    return updatedUser;
  }

  /**
   * 회원 탈퇴
   *
   * 회원 탈퇴를 진행합니다.
   *
   * 탈퇴한 유저의 닉네임과 이메일은 랜덤 문자열을 붙여 업데이트 합니다.
   * (재가입을 위함)
   *
   * @tag User
   * @summary 🟡(241026) 회원 탈퇴
   * @param request
   * @returns
   */
  @Delete('/')
  @UseGuards(AuthSerializeGuard)
  async signOut(@Req() request: any) {
    const userId = request.user.id;
    await this.deleteUserUsecase.execute(userId);
    request.session.destroy();
    return {
      message: 'success sign out',
    };
  }
}
