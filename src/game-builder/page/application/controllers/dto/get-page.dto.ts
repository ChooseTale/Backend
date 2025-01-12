export class GetPageResDto {
  id: number;
  gameId: number;
  title: string;
  contents: string;
  choices: {
    id: number;
    text: string;
    nextPageId: number;
  }[];
  backgroundImage: {
    url: string;
  };
}
