export interface GetPlayGameResultDto {
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
