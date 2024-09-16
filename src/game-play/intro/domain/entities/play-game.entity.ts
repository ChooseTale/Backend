import { PlayGame } from '@prisma/client';

export class PlayGameEntity {
  private playGame: {
    id: number;
    userId: number;
    gameId: number;
    isEnded: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  constructor(playGame: PlayGame) {
    this.playGame = playGame;
  }

  get id(): number {
    return this.playGame.id;
  }

  get userId(): number {
    return this.playGame.userId;
  }
}
