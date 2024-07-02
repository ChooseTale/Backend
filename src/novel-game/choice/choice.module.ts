import { Module } from '@nestjs/common';
import { ChoiceController } from './choice.controller';

@Module({
  controllers: [ChoiceController]
})
export class ChoiceModule {}
