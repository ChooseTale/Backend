import { Module } from '@nestjs/common';
import { ChoiceController } from './applications/controllers/choice.controller';

@Module({
  controllers: [ChoiceController],
})
export class ChoiceModule {}
