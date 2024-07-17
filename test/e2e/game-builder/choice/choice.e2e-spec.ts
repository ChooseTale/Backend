import { PrismaService } from '@@prisma/prisma.service';
import {
  setupPrismaService,
  setupTestModule,
} from '../../../utils/setup-prisma-service';
import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { ChoiceModule } from '@@src/game-builder/choice/applications/choice.module';

describe('Test', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    ({ prisma } = await setupPrismaService(
      process.env.TEST_DATABASE_URL,
      'choices',
    ));
    app = await setupTestModule(ChoiceModule, prisma);
  });

  describe('Create Choice', () => {
    it('should create a choice', async () => {
      const { error, statusCode } = await request(app.getHttpServer())
        .post('/game/1/choice')
        .send({ title: 'test', parentPageId: 1, description: 'test' });

      expect(statusCode).toBe(201);
      expect(error).toBe(false);
    });

    describe('유효성 검사', () => {
      it('parentPageId가 없으면 400을 반환한다', async () => {
        const { error, statusCode } = await request(app.getHttpServer())
          .post('/game/1/choice')
          .send({ title: 'test', description: 'test' });

        expect(statusCode).toBe(400);
        expect(error).not.toBe(false);
      });

      it('title이 없으면 400을 반환한다', async () => {
        const { error, statusCode } = await request(app.getHttpServer())
          .post('/game/1/choice')
          .send({ parentPageId: 1, description: 'test' });

        expect(statusCode).toBe(400);
        expect(error).not.toBe(false);
      });

      it('description이 없으면 400을 반환한다', async () => {
        const { error, statusCode } = await request(app.getHttpServer())
          .post('/game/1/choice')
          .send({ title: 'test', parentPageId: 1 });

        expect(statusCode).toBe(400);
        expect(error).not.toBe(false);
      });

      it('title은 30자 이하이어야 한다', async () => {
        // given

        const title = 'a'.repeat(31);
        const { error, statusCode } = await request(app.getHttpServer())
          .post('/game/1/choice')
          .send({ title, parentPageId: 1, description: 'test' });

        expect(statusCode).toBe(400);
        expect(error).not.toBe(false);
      });
    });

    describe('실패 케이스', () => {
      it('game이 존재하지 않는다면 404를 반환한다', async () => {
        //given
        const gameId = -1;

        //when
        const { error, statusCode } = await request(app.getHttpServer())
          .post(`/game/${gameId}/choice`)
          .send({ title: 'test', parentPageId: 1, description: 'test' });

        //then
        expect(statusCode).toBe(404);
        expect(error).not.toBe(false);
      });

      it('parentPage가 존재하지 않는다면 404를 반환한다', async () => {
        //given
        const parentPageId = -1;

        //when
        const { error, statusCode } = await request(app.getHttpServer())
          .post('/game/1/choice')
          .send({ title: 'test', parentPageId, description: 'test' });

        //then
        expect(statusCode).toBe(404);
        expect(error).not.toBe(false);
      });

      it('childPage가 존재하지 않는다면 404를 반환한다', async () => {
        //given
        const childPageId = -1;

        //when
        const { error, statusCode } = await request(app.getHttpServer())
          .post('/game/1/choice')
          .send({
            title: 'test',
            parentPageId: 1,
            childPageId,
            description: 'test',
          });

        //then
        expect(statusCode).toBe(404);
        expect(error).not.toBe(false);
      });
    });

    describe('동시성 체크', () => {
      it('choice는 4개까지 생성 가능하다', async () => {
        //given
        const gameId = 1;

        const createChoice = (index) => {
          return request(app.getHttpServer())
            .post(`/game/${gameId}/choice`)
            .send({
              title: `test${index}`,
              parentPageId: 3,
              description: `test description ${index}`,
            });
        };

        const promises: any = [];
        for (let i = 0; i < 5; i++) {
          promises.push(createChoice(i));
        }

        const results = await Promise.allSettled(promises);

        let fulfilledCount = 0;
        let rejectedCount = 0;

        results.forEach((result) => {
          if (
            result.status === 'fulfilled' &&
            result.value.statusCode === 201
          ) {
            fulfilledCount++;
          } else if (
            result.status === 'rejected' ||
            result.value.statusCode >= 400
          ) {
            rejectedCount++;
          }
        });

        //then
        expect(fulfilledCount).toBe(2);
        expect(rejectedCount).toBe(3);
      });
    });
  });
});
