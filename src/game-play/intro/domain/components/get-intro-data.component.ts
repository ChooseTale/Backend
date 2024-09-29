import { GetGameRepositoryPort } from '@@src/common/infrastructure/repositories/game/port/get-game.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IntroEntity } from '../entities/intro-data.entity';
import { UserRepositoryPort } from '@@src/common/infrastructure/repositories/user/port/user.repository.interface';
import { PlayRepositoryPort } from '@@src/common/infrastructure/repositories/play-game/port/play.repository.interface';
import { PageRepositoryPort } from '@@src/common/infrastructure/repositories/page/port/page.repository.interface';
import { ImageRepositoryPort } from '@@src/common/infrastructure/repositories/image/port/image.repository.interface';
import { Image } from '@prisma/client';
import { GetIntroDataComponentPort } from './port/get-intro-data.component.interface';
import { UserChoiceRepositoryPort } from '@@src/common/infrastructure/repositories/user-choice/port/user-choice.repository.interface';

@Injectable()
export class GetIntroDataComponent implements GetIntroDataComponentPort {
  constructor(
    @Inject('GetGameRepository')
    private readonly gameRepository: GetGameRepositoryPort,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryPort,
    @Inject('PlayGameRepository')
    private readonly playRepository: PlayRepositoryPort,
    @Inject('PageRepository')
    private readonly pageRepository: PageRepositoryPort,
    @Inject('ImageRepository')
    private readonly imageRepository: ImageRepositoryPort,
    @Inject('UserChoiceRepository')
    private readonly userChoiceRepository: UserChoiceRepositoryPort,
  ) {}

  async getIntroEntity(gameId: number, userId: number): Promise<IntroEntity> {
    const game = await this.gameRepository.getGameByIdOrThrow(gameId);
    const pages = await this.pageRepository.getAllByGameId(gameId);
    const producer = await this.userRepository.getUserByIdOrThrow(game.userId);
    const playGameDatas = await this.playRepository.getAllByUserId(userId);
    const userChoices = await this.userChoiceRepository.getAllByPlayIds(
      playGameDatas.map((play) => play.id),
    );
    let thumbnailImage: Image | null = null;
    if (game.thumbnailId) {
      thumbnailImage = await this.imageRepository.getImageById(
        game.thumbnailId,
      );
    }

    return new IntroEntity(
      game,
      pages,
      producer,
      playGameDatas.filter((play) => play.gameId === gameId),
      thumbnailImage,
      userChoices,
    );
  }
}
