import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
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
}
