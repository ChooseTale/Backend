import { Genres } from '@prisma/client';

export class CreateGameDomainEntity {
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public isPrivate: boolean = true;

  constructor(
    public userId: number,
    public title: string,
    public description: string,
    public genre: Genres,
  ) {}
}
