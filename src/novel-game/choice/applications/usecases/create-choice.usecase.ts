import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateChoiceReqDto } from '../controllers/dto/create-choice.dto';
import { ChoiceService } from '../../services/choice.service';

@Injectable()
export class CreateChoiceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly choiceService: ChoiceService,
  ) {}

  async excute(gameId: number, createChoiceReqDto: CreateChoiceReqDto) {}
}
