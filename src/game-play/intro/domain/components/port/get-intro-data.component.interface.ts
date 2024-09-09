import { IntroEntity } from '../../entities/intro-data.entity';

export interface GetIntroDataComponentInterface {
  getIntroEntity(gameId: number, userId: number): Promise<IntroEntity>;
}
