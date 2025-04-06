export interface IChatGPTKafkaPort {
  produceRecommendChoices(message: {
    title: string;
    contents: {
      content: string;
    }[];
    choices: {
      title: string;
    }[];
  }): Promise<void>;
}
