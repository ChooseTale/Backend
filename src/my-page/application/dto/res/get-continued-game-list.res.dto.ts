export class GetContinuedGameListResDto {
  game: {
    id: number;
    title: string;
    thumbnail: {
      url: string;
    };
    genre: string;
  };
  play: {
    id: number;
    createdAt: Date;
    page: {
      id: number;
      abridgement: string;
    };
  };
}
