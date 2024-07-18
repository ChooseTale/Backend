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
      const { error, statusCode } = await request(app.getHttpServer())
        .post('/game/1/page')
        .send({
          title: 'test',
          parentPageId: 1,
          description: 'test',
          isEnding: false,
          content: 'page content',
        });
      // //then
      if (error) {
        console.log(error);
      }
      expect(statusCode).toBe(201);
      expect(error).toBe(false);
    });

    describe('페이지 생성 실패', () => {
      describe('validation', () => {
        it('page의 content가 3000자를 초과하면 400을 반환한다', async () => {
          //when
          const { error, statusCode } = await request(app.getHttpServer())
            .post('/game/1/page')
            .send({
              title: 'test',
              parentPageId: 1,
              description: 'test',
              isEnding: false,
              content: 'page content'.repeat(1000),
            });
          //then
          expect(statusCode).toBe(400);
          expect(error).not.toBe(false);
        });
      });
    });
  });
});
