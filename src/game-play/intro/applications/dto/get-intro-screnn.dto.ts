export interface Producer {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  genre: string;
  thumbnailUrl: string;
  producer: Producer;
}

export interface EnrichData {
  lastUpdatedAt: Date;
  totalPlayCount: number;
  expectPlayTime: number;
  completedEnding: number;
  totalEnding: number;
}

export interface Play {
  id: number | null;
  page: {
    id: number;
    title: string;
  } | null;
}

export interface Page {
  id: number;
}

export interface GetIntroScreenResDto {
  game: Game;
  enrichData: EnrichData;
  play: Play | null;
  firstPage: Page;
}
