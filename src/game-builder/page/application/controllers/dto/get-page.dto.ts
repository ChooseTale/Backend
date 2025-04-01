export class GetPageResDto {
  id: number;
  gameId: number;
  title: string;
  contents: {
    content: string;
  }[];
  isStarting: boolean;
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
