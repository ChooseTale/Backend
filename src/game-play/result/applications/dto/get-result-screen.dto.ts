export interface GetResultScreenDto {
  endingPage: {
    id: number;
    abridgement: string;
  };
  choosenPages: {
    id: number;
    abridgement: string;
    choices: {
      id: number;
      title: string;
      percentage: number;
    }[];
  }[];
}
