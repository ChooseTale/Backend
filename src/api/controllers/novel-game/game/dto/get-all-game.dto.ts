type Choice = {
  id: number;
  fromPageId: number;
  toPageId: number;
  createdAt: Date;
};

type Page = {
  id: number;
  abridgement: string;
  createdAt: Date;
  depth: number;
  choices: Choice[];
};

export class GetAllGameResDto {
  id: number;
  title: string;
  pages: Page[];
}
