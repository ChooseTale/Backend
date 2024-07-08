import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
import OpenAI from 'openai';

import config from '@@src/config/index';
import { createMockData } from 'test/mock/create-mock';
@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('/mock')
  async mock() {
    await createMockData(this.prismaService);
  }

  @Post('/test-user')
  async testUser(@Query('count', ParseIntPipe) count: number) {
    // 유저가 존재하면 이메일 뒤에 숫자를 붙임. 숫자는 1부터 시작

    for (let i = 0; i < count; i++) {
      await this.prismaService.user.create({
        data: {
          email: `test${i}@test.com`,
        },
      });
    }
    return 'success';
  }

  @Get('/ping')
  ping(): { key: string } {
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
