import jsonEntities from './entities/index';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import fs from 'fs';

export const createMockData = async (prisma: PrismaClient) => {
  await prisma.$transaction(async (prisma) => {
    const tables: { tableName: string }[] =
      await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public'  AND tablename != '_prisma_migrations';`
        .then((tables: any) => {
          return tables.map((table) => {
            return { tableName: table.tablename };
          });
        })
        .then((tables) => {
          return tables.filter((table) => table.tableName !== 'Session');
        });

    await prisma.$executeRaw`SET session_replication_role = 'replica';`;

    // 모든 테이블 데이터 삭제
    for (const table of tables) {
      await prisma[table.tableName].deleteMany({ mock: true });
      // 시퀀스 업데이트
      await prisma.$executeRawUnsafe(`
        SELECT setval(pg_get_serial_sequence('"${table.tableName}"', 'id'), coalesce(max(id), 0) + 1, false)
        FROM "${table.tableName}";
        `);
    }

    for (const table of jsonEntities) {
      try {
        // 원본 데이터는 변경하지 않음

        let saveData: any[] = [...table.data];
        // 이미지라면 테스트를 위한 이미지를 다운받아 저장한다.
        if (table.tableName === 'Image') {
          for (const data of saveData as {
            id: number;
            imageLink: string;
            url: string;
            gameId: number;
          }[]) {
            const dest = '.' + data.url;

            // 파일이 이미 존재하는지 검사
            if (fs.existsSync(dest)) {
              continue;
            }

            const response = await axios.get(data.imageLink, {
              responseType: 'stream',
            });
            response.data
              .pipe(fs.createWriteStream(dest))
              .on('finish', () => {
                console.log('이미지 저장 완료 : ', dest);
              })
              .on('error', (err) => {
                console.error('파일 저장 중 오류 발생:', err);
              });
          }
          saveData = saveData.map((d) => {
            return {
              id: d.id,
              url: d.url,
              gameId: d.gameId,
            };
          });
        }

        if (table.tableName === 'User') {
          for (const data of saveData as {
            id: number;
            email: string;
            nickname: string;
            imageLink: string;
            profileImageUrl: string;
          }[]) {
            const dest = '.' + data.profileImageUrl;
            if (fs.existsSync(dest)) {
              continue;
            }

            const response = await axios.get(data.imageLink, {
              responseType: 'stream',
            });
            response.data
              .pipe(fs.createWriteStream(dest))
              .on('finish', () => {
                console.log('이미지 저장 완료 : ', dest);
              })
              .on('error', (err) => {
                console.error('파일 저장 중 오류 발생:', err);
              });
          }
          saveData = saveData.map((d) => {
            return {
              id: d.id,
              email: d.email,
              nickname: d.nickname,

              profileImageUrl: d.profileImageUrl,
            };
          });
        }

        const dates = [
          new Date(),
          new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        ];

        await prisma[table.tableName].createMany({
          data: saveData.map((d) => {
            const randomDate = dates[Math.floor(Math.random() * dates.length)];
            return {
              ...d,
              createdAt: randomDate,
              updatedAt: randomDate,
            };
          }),
        });

        // 시퀀스 업데이트

        await prisma.$executeRawUnsafe(`
          SELECT setval(pg_get_serial_sequence('"${table.tableName}"', 'id'), coalesce(max(id), 0) + 1, false)
          FROM "${table.tableName}";
        `);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }

    await prisma.$executeRaw`SET session_replication_role = 'origin';`;
  });
};
