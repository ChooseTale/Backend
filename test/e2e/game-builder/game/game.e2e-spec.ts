import { PrismaService } from '@@prisma/prisma.service';
import {
  setupPrismaService,
  setupTestModule,
} from '../../../utils/setup-prisma-service';
import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { GameModule } from '@@src/game-builder/game/application/game.module';

describe('Test', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    ({ prisma } = await setupPrismaService(
      process.env.TEST_DATABASE_URL,
      'game',
    ));
    app = await setupTestModule(GameModule, prisma);
  });

  describe('게임 생성', () => {
    it('🟢 게임 생성 성공', async () => {
      const { error, statusCode } = await request(app.getHttpServer())
        .post('/game')
        .send({
          title: 'test title',
          pageOneContent: 'test content',
        });

      if (error) {
        console.log(error);
      }

      expect(statusCode).toEqual(201);
    });

    it('🟢 게임이 생성되면 첫 페이지가 함께 생성되어야 한다.', async () => {
      const { error, body } = await request(app.getHttpServer())
        .post('/game')
        .send({
          title: 'test title',
          pageOneContent: 'test content',
        });

      if (error) {
        console.log(error);
      }

      expect(body).toEqual({
        id: expect.any(Number),
        page: expect.any(Object),
      });
    });

    describe('🔴 게임 생성 실패', () => {
      it('🔴 제목은 1글자 이상이어야 한다.', async () => {
        // title이 1자 이하일 때
        const { statusCode } = await request(app.getHttpServer())
          .post('/game')
          .send({
            title: '',
            pageOneContent: 'test content',
          });

        expect(statusCode).toEqual(400);
      });
      it('🔴 제목은 30자 이하이어야 한다.', async () => {
        let title = '';
        for (let i = 0; i < 31; i++) {
          title += 'a';
        }
        const { statusCode } = await request(app.getHttpServer())
          .post('/game')
          .send({
            title: title,
            pageOneContent: 'test content',
          });

        expect(statusCode).toEqual(400);
      });
      it('🔴 페이지 내용은 1글자 이상이어야 한다.', async () => {
        const { statusCode } = await request(app.getHttpServer())
          .post('/game')
          .send({
            title: 'test title',
            pageOneContent: '',
          });

        expect(statusCode).toEqual(400);
      });
      it('🔴 페이지 내용은 2000자 이하이어야 한다.', async () => {
        let pageOneContent = '';
        for (let i = 0; i < 2001; i++) {
          pageOneContent += 'a';
        }
        const { statusCode } = await request(app.getHttpServer())
          .post('/game')
          .send({
            title: 'test title',
            pageOneContent,
          });

        expect(statusCode).toEqual(400);
      });
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
