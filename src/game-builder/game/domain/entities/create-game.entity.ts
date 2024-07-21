import { Genres } from '@prisma/client';

export class CreateGameDomainEntity {
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public isPrivate: boolean = true;
  public genre: Genres = 'OTHER';
  public description: string = '';
  constructor(
    public userId: number,
    public title: string,
  ) {}
}
