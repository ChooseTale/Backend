export class GetContinuedGameListResDto {
  count: number;
  list: {
    game: {
      id: number;
      title: string;
      thumbnail: {
        url: string | null;
      };
      genre: string;
    };
    play: {
      id: number;
      createdAt: Date;
      page: {
        id: number;
        title: string;
      };
    };
  }[];
}
