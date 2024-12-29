export interface IChatGPTKafkaPort {
  produceRecommendChoices(message: {
    title: string;
    choices: {
      title: string;
      description: string;
    }[];
  }): Promise<void>;
}
