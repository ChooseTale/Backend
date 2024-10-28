import { OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import config from '@@src/config/index';

const tables = Object.values(Prisma.ModelName);

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const prisma = new PrismaClient({
      datasourceUrl: `postgresql://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}?schema=${config.db.schema}`,
    });

    await prisma.$connect();
  }

  async softDeleteFindMiddleware(
    params: any,
    next: (params: any) => Promise<any>,
  ) {
    if (
      tables.includes(params.model) &&
      (params.action == 'findUnique' || params.action == 'findMany')
    ) {
      // Exclude soft-deleted records
      if (!params.args) {
        params.args = {};
      }
      if (!params.args.where) {
        params.args.where = {};
      }
      params.args.where.deletedAt = null;
    }
    return next(params);
  }

  async softDeleteMiddleware(params: any, next: (params: any) => Promise<any>) {
    if (params.args.mock) {
      delete params.args.mock;
      return next(params);
    }
    if (
      tables.includes(params.model) &&
      (params.action == 'delete' || params.action == 'deleteMany')
    ) {
      // Change action to an update

      params.action = params.action == 'delete' ? 'update' : 'updateMany';

      params.args.data = {
        ...params.args.data,
        deletedAt: new Date(),
      };
    }
    return next(params);
  }

  constructor(dataSources: any) {
    super(dataSources);
    this.$use(this.softDeleteMiddleware);
    this.$use(this.softDeleteFindMiddleware);
  }
}
