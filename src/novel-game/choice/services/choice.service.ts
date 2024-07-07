import { Inject, Injectable } from '@nestjs/common';
import { ChoiceRepositoryInterface } from '../domain/repositories/choice.repository.interface';

@Injectable()
export class ChoiceService {
  constructor(
    @Inject('choiceRepositoryInterface')
    private readonly choiceRepository: ChoiceRepositoryInterface,
  ) {}
}
