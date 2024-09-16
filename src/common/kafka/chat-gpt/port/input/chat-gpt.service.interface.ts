export interface IChatGPTKafkaPort {
  produceRecommendChoices(message: {
    abridgement: string;
    choices: {
      title: string;
      description: string;
    }[];
  }): Promise<void>;
}
