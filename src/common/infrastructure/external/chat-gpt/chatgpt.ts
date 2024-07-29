import config from '@@src/config/index';
import { IChatGPTPagePort } from '@@src/game-builder/page/domain/ports/output/chatgpt/chatgpt.interface';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatGPT implements IChatGPTPagePort {
  private readonly apiKey: string;
  private readonly openAI: OpenAI;

  constructor() {
    this.apiKey = config.openAi.openAiApiKey;
    this.openAI = new OpenAI({ apiKey: this.apiKey });
  }

  async getAbridgedContent(content: string): Promise<string> {
    //return abridged content
    try {
      const completion = await this.openAI.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert at summarizing fiction. Summarize your content in 150 characters or less. The language should be spoken by the user. Answer 'error' if the sentence cannot be summarized.`,
          },
          { role: 'user', content },
        ],
        model: 'gpt-4o',
      });

      if (completion.choices[0].message.content === 'error') {
        return '';
      }

      return completion.choices[0].message.content ?? '';
    } catch (err) {
      return '';
    }
  }

  async getRecommandedChoices(
    abridgement: string,
    choices: { title: string; description: string }[],
  ): Promise<{ title: string; description: string }[]> {
    try {
      const completion = await this.openAI.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `I'm going to create a choice after looking at the content of the novel.
            If I present an example of options together, please recommend only non-overlapping options.
            I recommend up to four options, but subtract the number of options I offer,
            and give me the return value in the form of {tittle: string, description: string}[] for typescript JSON.parse.
            The description should be a maximum of 100 characters.
            The description should be predictable of the situation, and finish with a verb.
            If you can't create a choice, return 'error'. The language must be the same language as the content of the novel.`,
          },
          {
            role: 'user',
            content: `${abridgement}  ${JSON.stringify(choices)}`,
          },
        ],
        model: 'gpt-4o',
      });

      if (completion.choices[0].message.content == "'error'") {
        return [];
      }
      return JSON.parse(completion.choices[0].message.content ?? '[]');
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getThumbnailImage(
    abridgement: string,
    content: string,
    genre: string,
  ): Promise<string> {
    try {
      const response = await this.openAI.images.generate({
        model: 'dall-e-3',
        prompt: `
        Don't put text in the image. It should be a single image, not a cartoon format.
        You have to use the following information to create an image:
        - Abridgement: ${abridgement}
        - Content: ${content}
        - Genre: ${genre}

      `,
        n: 1,
        size: '1024x1024',
      });

      return response.data[0].url ?? '';
    } catch (err) {
      console.log(err);
      return '';
    }
  }
}
