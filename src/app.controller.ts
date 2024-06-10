import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/ping')
  ping(): string {
    return 'pong';
  }

  @Get('/db')
  db() {
    return this.prismaService.$queryRaw`SELECT 1`;
  }
}
