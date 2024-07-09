import jsonEntities from './entities/index';
import { PrismaClient } from '@prisma/client';

export const createMockData = async (prisma: PrismaClient) => {
  await prisma.$transaction(async (prisma) => {
    await prisma.$executeRaw`SET session_replication_role = 'replica';`;

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
