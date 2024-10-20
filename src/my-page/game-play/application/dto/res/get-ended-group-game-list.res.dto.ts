export class GetEndedGroupGameListResDto {
  game: {
    id: number;
    title: string;
    genre: string;
    totalEndingCount: number;
    thumbnail: {
      url: string;
    };
    endings: {
      playId: number;
      endingNumber: number;
      abridgement: string;
      reachedEndingAt: Date;
    }[];
  };
}
