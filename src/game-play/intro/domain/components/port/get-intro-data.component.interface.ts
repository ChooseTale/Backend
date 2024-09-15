import { IntroEntity } from '../../entities/intro-data.entity';

export interface GetIntroDataComponentPort {
  getIntroEntity(gameId: number, userId: number): Promise<IntroEntity>;
}
