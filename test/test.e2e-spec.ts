import { PrismaService } from '@@prisma/prisma.service';
import {
  setMockupData,
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
    await setMockupData(databaseUrl);
  });

  it('should be defined', async () => {
    const user = await prisma.user.findMany();
    console.log(user);
    expect(user).not.toBeNull();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
