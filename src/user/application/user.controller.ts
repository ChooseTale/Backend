import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  Session,
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

@Controller('user')
export class UserController {
  constructor(
    private readonly googleSocialLoginUsecase: GoogleSocialLoginUsecase,
    private readonly getMeUsecase: GetMeUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
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
  async login(@Body() body: LoginReqDto, @Req() request: any) {
    let userId: number;
    switch (body.type) {
      case 'google': {
        userId = await this.googleSocialLoginUsecase.execute(body.token);
        break;
      }
      default: {
        throw new Error('Invalid type');
      }
    }

    request.session.userId = userId;
    request.session.type = body.type;

    return {
      message: `success login userId: ${userId}`,
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

  @Patch('/')
  @UseGuards(AuthSerializeGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(
    @Req() request: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /jpeg|png|gif/ })],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
  ) {
    const userId = request.user.id;
    await this.updateUserUsecase.execute(userId, {}, image);
  }
}
