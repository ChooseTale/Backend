export interface IChatGPTPagePort {
  getAbridgedContent(content: string): Promise<string>;
  getRecommandedChoices(
    abridgement: string,
    choices: { title: string; description: string }[],
  ): Promise<{ title: string; description: string }[]>;
  getThumbnailImage(
    title: string,
    description: string,
    genre: string,
  ): Promise<string>;
}
