import { exec } from 'child_process';
import { promisify } from 'util';
import { PrismaService } from '../../prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { NotFoundException, ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createMockData } from 'test/mock/create-mock';

const execAsync = promisify(exec);

export async function setupPrismaService(
  databaseUrl: string | undefined,
  schema: string,
) {
  if (!databaseUrl) {
    throw new NotFoundException('Database url is not provided');
  }

  const prismaUrl = databaseUrl + '?schema=' + schema;

  await execAsync(
    `DATABASE_URL=${prismaUrl} npx prisma migrate deploy --preview-feature`,
  );

  const prisma = new PrismaService({
    datasources: {
      db: {
        url: prismaUrl,
      },
    },
  });

  return { prisma, databaseUrl: prismaUrl };
}

export async function setupTestModule(module: any, prisma: PrismaClient) {
  const moduleFixture = await Test.createTestingModule({
    imports: [module],
  })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .overrideProvider('IChatGPTPagePort')
    .useValue({
      getAbridgedContent: jest.fn().mockResolvedValue('abridged content'),
    })
    .overrideProvider(`IKafkaService`)
    .useValue({
      produceRecommendChoices: jest.fn().mockResolvedValue(undefined),
    })
    .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();

  await createMockData(prisma);

  return app;
}
