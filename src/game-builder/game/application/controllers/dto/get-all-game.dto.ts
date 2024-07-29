type Choice = {
  id: number;
  fromPageId: number;
  toPageId: number | null;
  createdAt: Date;
};

type Page = {
  id: number;
  abridgement: string;
  description: string;
  createdAt: Date;
  depth: number;
  isEnding: boolean;
  choices: Choice[];
};

export class GetAllGameResDto {
  id: number;
  title: string;
  pages: Page[];
}
