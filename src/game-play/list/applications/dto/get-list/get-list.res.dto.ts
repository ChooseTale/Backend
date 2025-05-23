export class GetListResDto {
  game: {
    id: number;
    title: string;
    thumbnail: {
      id: number;
      url: string;
    } | null;
    genre: string;
    createdAt: Date;
    updatedAt: Date;
    player: {
      userId: number;
      nickname: string;
      profileImage: {
        url: string;
      };
    }[];
  };
  publisher: {
    userId: number;
    nickname: string;
    profileImage: {
      url: string;
    };
  };
  enrichData: {
    totalEndingCount: number;
    totalRechedEndingPlayCount: number;
    expectPlayTime: number;
    me: {
      isExistReachedEndingPlay: boolean;
      reachedEndingPlayCount: number;
      isExistContinuePlay: boolean;
    };
  };
}
