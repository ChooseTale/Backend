export class GetEndedGameListResDto {
  ending: {
    playId: number;
  };
  game: {
    id: number;
    title: string;
    thumbnail: {
      url: string | null;
    };
    genre: string;
    reachedEndingAt: Date;
  };
}
