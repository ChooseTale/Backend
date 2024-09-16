export interface GetResultScreenDto {
  endingPage: {
    id: number;
    abridgement: string;
  };
  chosenPages: {
    id: number;
    abridgement: string;
    choices: {
      id: number;
      title: string;
      percentage: number;
    }[];
  }[];
}
