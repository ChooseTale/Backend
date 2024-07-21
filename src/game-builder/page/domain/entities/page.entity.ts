import { ConflictException } from '@nestjs/common';

export class PageDomainEntity {
  constructor(
    public id: number,
    public content: string,
    public abridgement: string,
    public gameId: number,
    public isEnding: boolean,
    public version: number,
    public createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  public setContent(content: string) {
    this.content = content;
  }

  public setAbridgement(abridgement: string) {
    this.abridgement = abridgement;
  }

  public checkIsEnding() {
    if (this.isEnding) {
      throw new ConflictException('엔딩 페이지에는 선택지를 만들 수 없습니다.');
    }
  }

  private checkEqualUpdateContent(content: string) {
    return this.content === content; // 내용이 변경되었는지 확인
  }

  private checkEqualUpdateAbridgement(abridgement: string) {
    return this.abridgement === abridgement;
  }

  public checkShouldUpdateAbridgement(content: string, abridgement: string) {
    return (
      !this.checkEqualUpdateContent(content) &&
      this.checkEqualUpdateAbridgement(abridgement)
    );
  }

  public checkCanUpdateByUpdatedData(content: string, abridgement: string) {
    return (
      (!this.checkEqualUpdateContent(content) &&
        !this.checkEqualUpdateAbridgement(abridgement)) ||
      (this.checkEqualUpdateContent(content) &&
        !this.checkEqualUpdateAbridgement(abridgement))
    );
  }
}
