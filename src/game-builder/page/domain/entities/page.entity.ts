import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PageDomainEntity {
  constructor(
    public id: number,
    public contents: { content: string }[],
    public title: string,
    public gameId: number,
    public isStarting: boolean,
    public isEnding: boolean,
    public version: number,
    public createdAt: Date,
    public updatedAt: Date,
    public backgroundImageId: number | null,
  ) {}

  public setContent(
    contents: {
      content: string;
    }[],
  ) {
    this.contents = contents;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setIsEnding(isEnding: boolean) {
    this.isEnding = isEnding;
  }

  public checkIsEnding() {
    if (this.isEnding) {
      throw new ConflictException('엔딩 페이지에는 선택지를 만들 수 없습니다.');
    }
  }

  public checkIsStarting() {
    if (this.isStarting) {
      throw new ConflictException('스타팅 페이지에 적용할 수 없는 요청');
    }
  }
}
