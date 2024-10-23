export class GetEndedGameListResDto {
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
