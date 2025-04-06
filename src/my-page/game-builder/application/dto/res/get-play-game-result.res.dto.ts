export interface GetPlayGameResultDto {
  endingPage: {
    id: number;
    title: string;
  };
  choosenPages: {
    id: number;
    title: string;
    choices: {
      id: number;
      title: string;
      percentage: number;
    }[];
  }[];
}
