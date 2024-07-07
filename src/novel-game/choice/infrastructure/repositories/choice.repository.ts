import { Injectable } from '@nestjs/common';
import { ChoiceRepositoryInterface } from '../../domain/repositories/choice.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class ChoiceRepository implements ChoiceRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
}
