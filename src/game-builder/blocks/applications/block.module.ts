import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';

@Module({
  imports: [],
  controllers: [BlockController],
  providers: [],
})
export class BlockModule {}
