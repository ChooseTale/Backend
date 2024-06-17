import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
import OpenAI from 'openai';

import config from '@@src/config/index';
@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/ping')
  ping(): { key: string } {
    let number = 1;
    if (number === 2) {
      throw new Error('error');
    }

    return { key: 'pong' };
  }

  @Get('/db')
  async db() {
    await this.prismaService.$queryRaw`SELECT 1`;
    return 'success';
  }

  @Post('/openai')
  async openai() {
    const openai = new OpenAI({
      apiKey: config.openAi.openAiApiKey,
    });
    const image = await openai.images.generate({
      prompt: 'a happy white dog sitting in the grass',
      n: 1,
      size: '512x512',
    });

    console.log(image.data[0]);
  }
}
