export class GetEndedGameListResDto {
  game: {
    id: number;
    title: string;
    thumbnail: {
      url: string;
    };
    genre: string;
    reachedEndingAt: Date;
  };
}
