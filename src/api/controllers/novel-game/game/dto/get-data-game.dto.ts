type Thumbnail = {
  id: number;
  url: string;
};

type Counts = {
  pages: number;
  choices: number;
  ending: number;
};

type GetDataGameResDto = {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  genre: string;
  thumbnails: Thumbnail[];
  createdAt: Date;
  counts: Counts;
};
