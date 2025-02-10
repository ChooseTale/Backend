import { Prisma } from '@prisma/client';

export interface GetPlayGameScreenDto {
  playId: number;
  gameIntroData: {
    game: {
      id: number;
      title: string;
      genre: string;
      thumbnailUrl: string;
      producer: {
        userId: number;
        nickname: string;
        profileImageUrl: string;
      };
    };
    enrichData: {
      lastUpdatedAt: Date;
      totalPlayCount: number;
      expectPlayTime: number;
      completedEnding: number;
      totalEnding: number;
    };
  };
  page: {
    id: number;
    title: string;
    contents: Prisma.JsonArray;
    backgroundImageUrl: string;
    choices: {
      id: number;
      title: string;
      toPageId: number | null;
    }[];
    isEnding: boolean;
  };
}
