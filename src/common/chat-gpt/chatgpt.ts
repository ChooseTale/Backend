import config from '@@src/config/index';
import { IChatGPTPagePort } from '@@src/game-builder/page/domain/ports/output/chatgpt/chatgpt.interface';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import fs from 'fs';
import axios from 'axios';
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
      const imageResponse = await this.openAI.images.generate({
        model: 'dall-e-3',
        prompt: `
      Create a single, detailed image that visually represents the following themes:
              - Abridgement: ${abridgement}
              - Genre: ${genre}
              ---
              Ensure the image does not contain any text and is presented in a realistic,
              single-image format rather than a cartoon style.

            `,
        n: 1,
        size: '1024x1024',
      });

      const response = await axios.get(imageResponse.data[0].url ?? '', {
        responseType: 'stream',
      });
      const fileName = `${new Date().getTime()}-${abridgement.slice(0, 10)}.png`;
      const filePath = config.files.gameThumnailImage.dest + `/${fileName}`;
      response.data.pipe(fs.createWriteStream(filePath)).on('error', (err) => {
        console.error('파일 저장 중 오류 발생:', err);
      });

      return config.files.gameThumnailImage.savePath + '/' + fileName;
    } catch (err) {
      console.log(err);
      return '';
    }
  }
}
