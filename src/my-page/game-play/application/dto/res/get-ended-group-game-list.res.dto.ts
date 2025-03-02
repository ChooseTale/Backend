export class GetEndedGroupGameListResDto {
  list: {
    game: {
      id: number;
      title: string;
      genre: string;
      totalEndingCount: number;
      thumbnail: {
        url: string | null;
      };
      author: {
        id: number;
        name: string;
      };
      endings: {
        playId: number;
        endingNumber: number;
        title: string;
        reachedEndingAt: Date;
      }[];
    }[];
  };
  count: number;
}
