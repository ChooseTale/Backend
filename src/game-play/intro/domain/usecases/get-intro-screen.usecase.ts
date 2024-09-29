import { Inject, Injectable } from '@nestjs/common';
import { GetIntroDataComponentPort } from '../components/port/get-intro-data.component.interface';
import { GetIntroScreenResDto } from '../../applications/dto/get-intro-screnn.dto';
import {
  getCompletedEndingCount,
  getExpectPlayTime,
} from '../services/get-enrich-data.service';

@Injectable()
export class GetIntroScreenUsecase {
  constructor(
    @Inject('GetIntroDataComponent')
    private readonly getIntroDataComponent: GetIntroDataComponentPort,
  ) {}

  async execute(gameId: number, userId: number): Promise<GetIntroScreenResDto> {
    const introEntity = await this.getIntroDataComponent.getIntroEntity(
      gameId,
      userId,
    );

    const getIntroScreenResDto: GetIntroScreenResDto = {
      game: {
        id: introEntity.game.id,
        title: introEntity.game.title,
        description: introEntity.game.description,
        genre: introEntity.game.genre,
        thumbnailUrl: introEntity.game.thumbnailUrl,
        producer: {
          userId: introEntity.game.producer.userId,
          nickname: introEntity.game.producer.nickname,
          profileImageUrl: introEntity.game.producer.profileImageUrl,
        },
      },
      play: introEntity.currentPlayGameData
        ? {
            id: introEntity.currentPlayGameData.id,
            page: introEntity.currentPlayGameData.page,
          }
        : null,
      firstPage: introEntity.game.firstPage,
      enrichData: {
        lastUpdatedAt: introEntity.game.updatedAt,
        totalPlayCount: introEntity.playGameDatas.length,
        expectPlayTime: getExpectPlayTime(introEntity),
        completedEnding: getCompletedEndingCount(introEntity),
        totalEnding: introEntity.game.pages.filter((page) => page.isEnding)
          .length,
      },
    };

    return getIntroScreenResDto;
  }
}
