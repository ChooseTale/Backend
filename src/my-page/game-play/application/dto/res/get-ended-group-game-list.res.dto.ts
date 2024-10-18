export class GetEndedGroupGameListResDto {
  game: {
    id: number;
    title: string;
    genre: string;
    totalEndingCount: number;
    endings: {
      playId: number;
      endingNumber: number;
      abridgement: string;
      reachedEndingAt: Date;
    }[];
  };
}
