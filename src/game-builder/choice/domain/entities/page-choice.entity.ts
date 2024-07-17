import { ConflictException } from '@nestjs/common';
import { ChoiceDomainEntity } from './choice.entity';

export class PageChoice {
  constructor(
    public readonly pageId: number,
    public readonly choices: ChoiceDomainEntity[],
  ) {}

  checkChoiceLength() {
    if (this.choices.length > 3) {
      throw new ConflictException('초이스는 4개까지만 가능합니다.');
    }
  }
}
