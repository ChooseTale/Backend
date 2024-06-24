import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
// import { FastifyAdaptor } from "@nestjs/platform-fastify";

import { AppModule } from './src/app.module';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule);
    // const app = await NestFactory.create(YourModule, new FastifyAdaptor());
    // app.setGlobalPrefix("api");
    // app.enableVersioning({
    //     type: VersioningType.URI,
    //     prefix: "v",
    // })
    return app;
  },
  output: 'libs/types',
  clone: true,
  swagger: {
    output: 'nestia/swagger.json',
    security: {},
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Local Server',
      },
    ],
    beautify: true,
  },
};
export default NESTIA_CONFIG;
