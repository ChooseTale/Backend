import { ConflictException } from '@nestjs/common';

export class PageDomainEntity {
  constructor(
    public id: number,
    public content: string,
    public abridgement: string,
    public gameId: number,
    public isEnding: boolean,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  public checkIsEnding() {
    if (this.isEnding) {
      throw new ConflictException('엔딩 페이지에는 선택지를 만들 수 없습니다.');
    }
  }
}
