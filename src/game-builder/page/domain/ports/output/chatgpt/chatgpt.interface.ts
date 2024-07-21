export interface IChatGPTPagePort {
  getAbridgedContent(content: string): Promise<string>;
}
