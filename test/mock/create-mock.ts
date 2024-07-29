import jsonEntities from './entities/index';
import { PrismaClient } from '@prisma/client';

export const createMockData = async (prisma: PrismaClient) => {
  await prisma.$transaction(async (prisma) => {
    const tables: { tableName: string }[] =
      await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename != '_prisma_migrations';`.then(
        (tables: any) => {
          return tables.map((table) => {
            return { tableName: table.tablename };
          });
        },
      );

    await prisma.$executeRaw`SET session_replication_role = 'replica';`;

    // 모든 테이블 데이터 삭제
    for (const table of tables) {
      await prisma[table.tableName].deleteMany();
      // 시퀀스 업데이트
      await prisma.$executeRawUnsafe(`
        SELECT setval(pg_get_serial_sequence('"${table.tableName}"', 'id'), coalesce(max(id), 0) + 1, false)
        FROM "${table.tableName}";
      `);
    }

    for (const table of jsonEntities) {
      try {
        await prisma[table.tableName].createMany({
          data: table.data.map((d) => ({
            ...d,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
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
