export class GameThumbnailDomainEntity {
  id: number;
  url: string;
  gameId: number;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(id: number, url: string, gameId: number) {
    this.id = id;
    this.url = url;
    this.gameId = gameId;
  }
}
