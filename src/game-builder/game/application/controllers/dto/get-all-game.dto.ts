type Choice = {
  id: number;
  fromPageId: number;
  toPageId: number | null;
  createdAt: Date;
};

type Page = {
  id: number;
  title: string;
  contents: {
    content: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  depth: number;
  isStarting: boolean;
  isEnding: boolean;
  backgroundImage: {
    url: string | null;
  };
  choices: Choice[];
};

export class GetAllGameResDto {
  id: number;
  title: string;
  pages: Page[];
}
