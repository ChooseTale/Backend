import jsonEntities from './entities/index';
import { PrismaClient } from '@prisma/client';

export const createMockData = async (prisma: PrismaClient) => {
  await Promise.all(
    jsonEntities.map(async (table) => {
      await prisma[table.tableName].createMany({
        data: table.data,
      });
    }),
  );
};
