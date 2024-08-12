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

  describe('게임 상세 데이터 불러오기', () => {
    it('🟢 게임 데이터를 불러올 수 있다.', async () => {
      const { error, statusCode, body } = await request(app.getHttpServer())
        .get('/game/1/data')
        .send();

      expect(statusCode).toBe(200);
      expect(error).toBe(false);

      /**
       *  id: 1,
        title: '좀비',
        description: '좀비가 나타났다. 어떻게하면 살아남을 수 있을까?',
        isPrivate: false,
        genre: 'HORROR',
        createdAt: '2024-08-12T10:13:48.798Z',
        thumbnails: [],
        counts: { pages: 8, choices: 6, ending: 4 }
       */
      expect(body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        isPrivate: expect.any(Boolean),
        genre: expect.any(String),
        createdAt: expect.any(String),
        thumbnails: expect.any(Array),
        counts: expect.any(Object),
      });
    });

    it('🔴 존재하지 않는 게임이라면 에러를 반환한다.', async () => {
      const { error, statusCode } = await request(app.getHttpServer())
        .get('/game/999/data')
        .send();

      expect(statusCode).toBe(404);
      expect(error).not.toBe(false);
    });
  });

  describe(`게임 전체 불러오기`, () => {
    it('🟢 게임 전체 불러오기 성공', async () => {
      const { error, statusCode, body } = await request(app.getHttpServer())
        .get('/game/1')
        .send();

      expect(statusCode).toBe(200);
      expect(error).toBe(false);

      expect(body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        pages: expect.any(Array),
      });
    });

    it('🔴 게임이 존재하지 않으면 에러를 반환한다.', async () => {
      const { error, statusCode } = await request(app.getHttpServer())
        .get('/game/999')
        .send();

      expect(statusCode).toBe(404);
      expect(error).not.toBe(false);
    });
  });

  describe(`게임 생성`, () => {
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

    afterAll(async () => {
      await prisma.$disconnect();
      await app.close();
    });
  });
});
