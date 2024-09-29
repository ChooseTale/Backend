import { Genres } from '@prisma/client';

export class GameDomainEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public isPrivate: boolean,
    public genre: Genres,

    public thumbnailId: number | null,
    public userId: number,

    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
