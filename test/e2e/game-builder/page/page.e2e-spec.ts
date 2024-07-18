import { PrismaService } from '@@prisma/prisma.service';
import {
  setupPrismaService,
  setupTestModule,
} from '../../../utils/setup-prisma-service';
import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { PageModule } from '@@src/game-builder/page/application/page.module';

describe('Test', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    ({ prisma } = await setupPrismaService(
      process.env.TEST_DATABASE_URL,
      'pages',
    ));
    app = await setupTestModule(PageModule, prisma);
  });

  describe('페이지 생성', () => {
    it('should create a page', async () => {
      //when
      // const { error, statusCode } = await request(app.getHttpServer())
      //   .post('/game/1/page')
      //   .send({ title: 'test', parentPageId: 1, description: 'test' });
      // //then
      // expect(statusCode).toBe(201);
      // expect(error).toBe(false);
    });
  });
});
