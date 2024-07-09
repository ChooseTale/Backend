import jsonEntities from './entities/index';
import { PrismaClient } from '@prisma/client';

export const createMockData = async (prisma: PrismaClient) => {
  await prisma.$transaction(async (prisma) => {
    await prisma.$executeRaw`SET session_replication_role = 'replica';`;

    await Promise.all(
      jsonEntities.map(async (table) => {
        try {
          await prisma[table.tableName].createMany({
            data: table.data.map((d) => ({
              ...d,
              createdAt: new Date(),
              updatedAt: new Date(),
            })),
          });
        } catch (err) {
          console.error(err);
          throw err;
        }
      }),
    );
    await prisma.$executeRaw`SET session_replication_role = 'origin';`;
  });
};
