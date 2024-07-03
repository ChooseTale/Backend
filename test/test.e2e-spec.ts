import { PrismaService } from '@@prisma/prisma.service';
import {
  setupPrismaService,
  setupTestModule,
} from './utils/setup-prisma-service';
import { AppModule } from '@@src/app.module';
import { INestApplication } from '@nestjs/common';

describe('Test', () => {
  let prisma: PrismaService;
  let databaseUrl: string;
  let app: INestApplication;

  beforeAll(async () => {
    ({ prisma, databaseUrl } = await setupPrismaService(
      process.env.TEST_DATABASE_URL,
      'test',
    ));
    app = await setupTestModule(AppModule, prisma);
  });

  it('should be defined', async () => {
    const user = await prisma.user.findMany();

    expect(user).not.toBeNull();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
