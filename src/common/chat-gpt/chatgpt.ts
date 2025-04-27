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
    title: string,
    contents: { content: string }[],
    choices: { title: string; description: string }[],
  ): Promise<{ title: string; description: string }[]> {
    try {
      const completion = await this.openAI.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `역할: 너는 소설의 선택지를 추천해주는 챗봇이야.
            소설의 내용과 이전의 선택지들을 보고 추천해줘.
            추천해준 선택지는 이전의 선택지들과 겹치면 안돼.
            추천해준 선택지는 최대 4개까지만 추천해줘.
            추천해준 선택지의 설명은 최대 100자까지만 써줘.
            추천해준 선택지의 설명은 상황에 맞게 써줘.
            반환 타입은 {tittle: string, description: string}[]이야.
            만약 선택지를 추천할 수 없다면 'error'를 반환해.`,
          },
          {
            role: 'user',
            content: `제목 : ${title} 내용: ${JSON.stringify(contents)} 선택지 : ${JSON.stringify(choices)}`,
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
    title: string,
    description: string,
    genre: string,
  ): Promise<string> {
    try {
      const promptGPT = await this.openAI.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `너는 게임의 썸네일을 제작하기 위한 프롬프트를 제작하는 제작가야.
나는 너에게 게임의 제목과 간단한 설명, 장르를 제시할 것이고, 너는 dall e-2가 이미지를 적합하게 뽑아낼 수 있도록 프롬프트를 작성해 줘야해.
만약, 이미지를 생성하기에 정보가 부족하다면 'error'를 반환해줘.`,
          },
          {
            role: 'user',
            content: `제목 : ${title} 설명 : ${description} 장르 : ${genre}`,
          },
        ],
      });

      if (promptGPT.choices[0].message.content === 'error') {
        return '';
      }

      const imageResponse = await this.openAI.images.generate({
        model: 'dall-e-3',
        prompt: promptGPT.choices[0].message.content ?? '',
        n: 1,
        size: '1024x1024',
      });

      const response = await axios.get(imageResponse.data?.[0]?.url ?? '', {
        responseType: 'stream',
      });
      const fileName = `${new Date().getTime()}-${title.slice(0, 10)}.png`;
      const filePath = config.files.gameThumnailImage.savePath + `/${fileName}`;
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
