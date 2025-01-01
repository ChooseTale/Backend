export type ProduceRecommendChoicesInputType = {
  title: string;
  contents: {
    content: string;
  }[];
  choices: {
    title: string;
    description: string;
  }[];
};
