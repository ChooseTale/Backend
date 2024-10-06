export class GetListResDto {
  game: {
    id: number;
    title: string;
    thumbnail: {
      id: number;
      url: string;
    };
    genre: string;
    createdAt: Date;
    updatedAt: Date;
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
