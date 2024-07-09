import config from '@@src/config/index';
import OpenAI from 'openai';

export class ChatGPT {
  private readonly apiKey: string;
  private readonly openAI: OpenAI;

  constructor() {
    this.apiKey = config.openAi.openAiApiKey;
    this.openAI = new OpenAI({ apiKey: this.apiKey });
  }

  async getAbridgedContent(content: string): Promise<string> {
    //return abridged content
    const completion = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert at summarizing fiction. Summarize your content in 150 characters or less. The language should be spoken by the user.`,
        },
        { role: 'user', content },
      ],
      model: 'gpt-4o',
    });
    return completion.choices[0].message.content ?? '';
  }
}
