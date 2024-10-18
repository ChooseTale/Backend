import { Module } from '@nestjs/common';
import { MyPageController } from './my-page.controller';

@Module({
  controllers: [MyPageController],
})
export class MyPageModule {}
