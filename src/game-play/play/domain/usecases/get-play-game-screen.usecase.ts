import { GetIntroDataComponentPort } from '@@src/game-play/intro/domain/components/port/get-intro-data.component.interface';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { GetPlayGameScreenDto } from '../../applications/dto/get-play-game-screen.dto';
import { GetPageDataComponentPort } from '../../components/port/get-page-data.components.interface';

import {
  getCompletedEndingCount,
  getExpectPlayTime,
} from '@@src/game-play/intro/domain/services/get-enrich-data.service';
import { mapPageDataToResDto } from '../services/mapper/page.mapper';
import { PlayRepositoryPort } from '@@src/common/infrastructure/repositories/play-game/port/play.repository.interface';

@Injectable()
export class GetPlayGameScreenUsecase {
  constructor(
    @Inject('GetIntroDataComponent')
    private readonly getIntroDataComponent: GetIntroDataComponentPort,
    @Inject('GetPageDataComponent')
    private readonly getPageDataComponent: GetPageDataComponentPort,
    @Inject('PlayGameRepository')
    private readonly playRepository: PlayRepositoryPort,
  ) {}

  async execute(playId: number, userId: number): Promise<GetPlayGameScreenDto> {
    const play = await this.playRepository.getPlayById(playId);

    if (!play) {
      throw new ConflictException('플레이 데이터가 없습니다.');
    }

    const introEntity = await this.getIntroDataComponent.getIntroEntity(
      play.gameId,
      userId,
    );

    // 현재 진행중인 플레이의 데이터를 가져오는 것이므로 데이터가 없으면 오류 발생
    if (!introEntity.currentPlayGameData) {
      throw new ConflictException('진행중인 데이터가 없습니다.');
    }

    const pageData = await this.getPageDataComponent.getPageEntity(
      play.gameId,
      introEntity.currentPlayGameData.page.id,
    );

    return {
      playId: introEntity.currentPlayGameData.id,
      gameIntroData: {
        game: {
          id: introEntity.game.id,
          title: introEntity.game.title,
          genre: introEntity.game.genre,
          thumbnailUrl: introEntity.game.thumbnailUrl,
          producer: {
            userId: introEntity.game.producer.userId,
            nickname: introEntity.game.producer.nickname,
            profileImageUrl: introEntity.game.producer.profileImageUrl,
          },
        },
        enrichData: {
          lastUpdatedAt: introEntity.game.updatedAt,
          totalPlayCount: introEntity.playGameDatas.length,
          expectPlayTime: getExpectPlayTime(introEntity),
          completedEnding: getCompletedEndingCount(introEntity),
          totalEnding: introEntity.game.pages.filter((page) => page.isEnding)
            .length,
        },
      },
      page: mapPageDataToResDto(pageData),
    };
  }
}
