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
  UploadedFiles,
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

@Controller('game')
export class GameController {
  constructor(
    private readonly createGameUsecase: CreateGameUsecase,
    private readonly getAllUsecase: GetAllGameUsecase,
    private readonly getDataUsecase: GetDataUsecase,
    private readonly getRecommandImageUseCase: GetRecommandImageUseCase,
    private readonly uploadImagesUsecase: UploadImagesUseCase,
    private readonly deleteImageUsecase: DeleteGameUseCase,
    private readonly updateGameUsecase: UpdateGameUseCase,
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
   * @param gameId
   * @returns
   * @summary 🟡(240723) 게임 데이터 불러오기
   */
  @Get('/:gameId/data')
  async getData(@Param('gameId', ParseIntPipe) gameId: number) {
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
   * @param gameId
   * @returns
   * @summary 🟡(240723) 게임 전체 불러오기
   */
  @Get('/:gameId')
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
   * `pageOneContent`를 이용해 게임의 첫 페이지에 들어갈 내용을 설정합니다.
   *
   *
   *
   * @tag Game
   * @summary 🟢(240718)
   */
  @Post()
  async create(
    @Body() createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    return await this.createGameUsecase.excute(1, createGameReqDto);
  }

  /**
   *
   * @tag Game
   * @summary 🟡(240730) 게임 썸네일 이미지 업로드
   */
  @Post(':gameId/upload-thumbnail')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImages(
    @Param('gameId', ParseIntPipe) gameId: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // jpeg와 png, gif 허용
          new FileTypeValidator({
            fileType: /jpeg|png|gif/,
          }),
          new MaxFileSizeValidator({
            maxSize: 3 * 1024 * 1024,
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return await this.uploadImagesUsecase.execute(gameId, files);
  }

  /**
   *
   * @tag Game
   */
  @Patch(':gameId')
  async update(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() body: UpdateGameReqDto,
  ): Promise<UpdateGameResDto> {
    return await this.updateGameUsecase.execute(gameId, 1, body);
  }

  /**
   *
   * @tag Game
   * @summary 🟡(240726) 게임 추천 썸네일 이미지 생성
   */
  @Post(':gameId/recommend-image')
  async recommendImage(
    @Param('gameId', ParseIntPipe) gameId: number,
  ): Promise<string> {
    return await this.getRecommandImageUseCase.execute(gameId);
  }

  /**
   *
   * @param gameId
   * @param imageId
   * @returns
   *
   * @tag Game
   * @summary 🟡(240730) 게임 썸네일 이미지 삭제
   */
  @Delete(':gameId/thumbnail/:imageId')
  async deleteImage(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ): Promise<string> {
    await this.deleteImageUsecase.execute(imageId, gameId);
    return 'success';
  }
}
