import { Prisma } from '@prisma/client';

export interface GetPlayGameScreenDto {
  playId: number;
  gameIntroData: {
    game: {
      id: number;
      title: string;
      description: string;
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
    contents: Prisma.JsonArray;

    choices: {
      id: number;
      title: string;
      description: string;
      toPageId: number | null;
    }[];
    isEnding: boolean;
  };
}
