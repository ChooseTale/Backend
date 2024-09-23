import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
import OpenAI from 'openai';

import config from '@@src/config/index';
import { createMockData } from 'test/mock/create-mock';
import fs from 'fs';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/mock')
  async mock() {
    await createMockData(this.prismaService);

    // uploads 폴더 초기화
    fs.rmSync('uploads', { recursive: true, force: true });

    fs.mkdirSync('uploads');

    const dirNames = ['game-thumnail-images'];
    dirNames.forEach((dirName) => {
      fs.mkdirSync(`uploads/${dirName}`);
    });
    return 'success';
  }

  // @Get('/test-jwt')
  // async testJwt() {
  //   const token = await this.jwtService.signAsync(
  //     {
  //       key: 'choose-tale',
  //     },
  //     {
  //       secret: config.allowJwtSecret,
  //     },
  //   );

  //   return token;
  // }

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
  }
}
