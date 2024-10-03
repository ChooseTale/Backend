import { Module } from '@nestjs/common';
import { ListController } from './list.controller';

@Module({
  imports: [],
  controllers: [ListController],
  providers: [],
})
export class ListModule {}
