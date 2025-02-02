export class GetPageResDto {
  id: number;
  gameId: number;
  title: string;
  contents: {
    content: string;
  }[];
  isEnding: boolean;
  choices: {
    id: number;
    text: string;
    nextPageId: number | null;
  }[];
  backgroundImage: {
    url: string | null;
  };
}
