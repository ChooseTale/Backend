import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateGameReqDto, CreateGameResDto } from './dto/create-game.dto';
import { UpdateGameReqDto, UpdateGameResDto } from './dto/update-game.dto';
import { GetAllGameResDto } from './dto/get-all-game.dto';

import { CreateGameUsecase } from '../usecases/create-game.usecase';
import { GetAllGameUsecase } from '../usecases/get-all.usecase';
import { GetDataUsecase } from '../usecases/get-data.usecase';
import { GetRecommandImageUseCase } from '../usecases/get-recommand-image.usecase';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadImagesUseCase } from '../usecases/upload-images.usecase';
import { DeleteGameUseCase } from '../usecases/delete-game.usecase';
import { UpdateGameUseCase } from '../usecases/update-game.usecase';
import { GetRecommentImageDto } from './dto/get-recomment-image.dto';
import { GetDataGameResDto } from './dto/get-data-game.dto';
import { AuthSerializeGuard } from '@@src/common/guard/auth.serielize.guard';
import { IsMyGameGuard } from '@@src/game-builder/guard/is-my-game.guard';
import { PublishGameUsecase } from '../usecases/publish.usecase';
import { Genres } from '@prisma/client';

@Controller('game')
@UseGuards(AuthSerializeGuard)
export class GameController {
  constructor(
    private readonly createGameUsecase: CreateGameUsecase,
    private readonly getAllUsecase: GetAllGameUsecase,
    private readonly getDataUsecase: GetDataUsecase,
    private readonly getRecommandImageUseCase: GetRecommandImageUseCase,
    private readonly uploadImagesUsecase: UploadImagesUseCase,
    private readonly deleteImageUsecase: DeleteGameUseCase,
    private readonly updateGameUsecase: UpdateGameUseCase,
    private readonly publishUsecase: PublishGameUsecase,
  ) {}

  /**
   * 게임 데이터 불러오기
   *
   * 메인(리스트) 페이지에 출력 할 게임의 정보를 관리하는 데이터를 불러옵니다.
   *
   * isPrivate가 true라면 리스트페이지에 출력되지 않습니다.
   * genre는 nestia sdk를 참고해 enum값만을 가져야합니다.
   * thumbnails는 사용자가 가질 수 있는 이미지들입니다. `index 0의 이미지`가 게임이 가지는 메인이미지입니다.
   *
   * @tag Game
   * @param gameId
   * @returns
   * @summary 🟢(240812) 게임 데이터 불러오기
   */
  @Get('/:gameId/data')
  @UseGuards(IsMyGameGuard)
  async getData(
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<GetDataGameResDto> {
    return await this.getDataUsecase.execute(gameId);
  }

  /**
   * 게임 전체 불러오기
   *
   * 게임의 유지보수를 위해 게임의 정보 전체를 불러옵니다.
   *
   *
   * 0630 page isEnding 추가
   * 0723 page isStarting 추가
   * 0730 page isEnding res 추가
   * 0730 page updatedAt 추가
   *
   * @tag Game
   * @param gameId
   * @returns
   * @summary 🟢(240812) 게임 전체 불러오기
   */
  @Get('/:gameId')
  @UseGuards(IsMyGameGuard)
  async getAll(
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<GetAllGameResDto> {
    return await this.getAllUsecase.execute(gameId);
  }

  /**
   * 게임 생성하기
   *
   * 새로운 게임을 생성합니다.
   *
   * 241229 게임 생성 페이지가 변경됨에 따라 장르 추가
   *
   * - 기획 변경에 따라 썸네일 이미지 업로드를 추가해야할 수 있음.
   *
   * @tag Game
   * @summary 🟢(241229) 게임 생성하기
   */
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Req() req: any,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // jpeg와 png, gif 허용
          new FileTypeValidator({
            fileType: /jpeg|png|gif|webp|jpg|image\/*/,
          }),
          new MaxFileSizeValidator({
            maxSize: 3 * 1024 * 1024,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
    @Body() createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    return await this.createGameUsecase.excute(
      req.user.id,
      createGameReqDto,
      files,
    );
  }

  /**
   * 게임 썸네일 이미지 업로드
   *
   * 게임의 썸네일 이미지를 업로드합니다.
   *
   * @tag Game
   * @summary 🟢(240812) 게임 썸네일 이미지 업로드
   */
  // @Post(':gameId/upload-thumbnail')
  // @UseGuards(IsMyGameGuard)
  // @UseInterceptors(FilesInterceptor('images'))
  // async uploadImages(
  //   @Param('gameId', ParseIntPipe) gameId: number,
  //   @UploadedFiles(
  //     new ParseFilePipe({
  //       validators: [
  //         // jpeg와 png, gif 허용
  //         new FileTypeValidator({
  //           fileType: /jpeg|png|gif/,
  //         }),
  //         new MaxFileSizeValidator({
  //           maxSize: 3 * 1024 * 1024,
  //         }),
  //       ],
  //       fileIsRequired: false,
  //     }),
  //   )
  //   files: Array<Express.Multer.File>,
  // ) {
  //   return await this.uploadImagesUsecase.execute(gameId, files);
  // }

  /**
   * 게임 정보 수정
   *
   * 게임의 정보를 수정합니다.
   *
   * @tag Game
   * @summary 🟢(240812) 게임 정보 수정
   */
  @Patch(':gameId')
  @UseGuards(IsMyGameGuard)
  async update(
    @Req() req: any,
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() body: UpdateGameReqDto,
  ): Promise<UpdateGameResDto> {
    return await this.updateGameUsecase.execute(gameId, req.user.id, body);
  }

  @Patch(':gameId/publish')
  @UseGuards(IsMyGameGuard)
  async publish(@Param('gameId', ParseIntPipe) gameId: number): Promise<void> {
    return await this.publishUsecase.execute(gameId);
  }

  /**
   * 게임 추천 썸네일 이미지 생성
   *
   * 게임의 추천 썸네일 이미지를 생성합니다.
   *
   * @tag Game
   * @summary 🟡(240726) 게임 추천 썸네일 이미지 생성
   */
  @Post(':gameId/recommend-image')
  async recommendImage(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() body: { title: string; description: string; genre: Genres },
  ): Promise<GetRecommentImageDto> {
    return {
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XyZTnjNifxUU5reDbdFFMkGG/user-7T71nvcI6lYXV6RIPeFEKyLz/img-UTKIe4S0m7qjfMBg6MnUo4n2.png?st=2025-02-24T11%3A17%3A25Z&se=2025-02-24T13%3A17%3A25Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-02-24T05%3A52%3A53Z&ske=2025-02-25T05%3A52%3A53Z&sks=b&skv=2024-08-04&sig=T5ODHUJygh1ZlMYVfSDo4WPUBDglVY2qUHpMfa5Y9T8%3D',
    };
    // return await this.getRecommandImageUseCase.execute(body);
  }

  /**
   * 게임 썸네일 이미지 삭제
   *
   * 게임의 썸네일 이미지를 삭제합니다.
   *
   * @param gameId
   * @param imageId
   * @returns
   *
   * @tag Game
   * @summary 🟡(240730) 게임 썸네일 이미지 삭제
   */
  @Delete(':gameId/thumbnail/:imageId')
  @UseGuards(IsMyGameGuard)
  async deleteImage(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ): Promise<string> {
    await this.deleteImageUsecase.execute(imageId, gameId);
    return 'success';
  }
}
