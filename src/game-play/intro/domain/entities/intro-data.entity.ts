import { Game, Page, User, Image, PlayGame } from '@prisma/client';
import { Play } from '../../applications/dto/get-intro-screnn.dto';

export class IntroEntity {
  game: {
    id: number;
    title: string;
    description: string;
    genre: string;
    thumbnailUrl: string;
    updatedAt: Date;
  };
  producer: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  play: {
    id: number | null;
  };
  firstPage: {
    id: number;
  };

  constructor(
    game: Game,
    producer: User,
    play: PlayGame | null,
    firstPage: Page,
    thumbnailImage: Image | null,
  ) {
    this.game = {
      id: game.id,
      title: game.title,
      description: game.description,
      genre: game.genre,
      thumbnailUrl: thumbnailImage?.url ?? '',
      updatedAt: game.updatedAt,
    };
    this.producer = {
      userId: producer.id,
      nickname: '유저에 추가해야함',
      profileImageUrl: '유저에 추가해야함',
    };
    // game play데이터는 없을 수 있다.
    this.play = {
      id: play?.id ?? null,
    };
    this.firstPage = {
      id: firstPage.id,
    };
  }
}
