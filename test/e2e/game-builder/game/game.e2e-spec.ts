import { PrismaService } from '@@prisma/prisma.service';
import {
  setupPrismaService,
  setupTestModule,
} from '../../../utils/setup-prisma-service';
import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { GameModule } from '@@src/novel-game/game/application/controllers/game.module';

describe('Test', () => {
  let prisma: PrismaService;
  let databaseUrl: string;
  let app: INestApplication;

  beforeAll(async () => {
    ({ prisma, databaseUrl } = await setupPrismaService(
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
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
