export class GetMyBuildedGameResDto {
  games: {
    id: number;
    title: string;
    thumbnail: {
      url: string | null;
    };
    description: string;
    genre: string;
    createdAt: Date;
    updatedAt: Date;
    count: {
      endingCount: number;
      choiceCount: number;
      pageCount: number;
      reachEndingPlayerCount: number | null;
    };
  }[];
  count: number;
}
