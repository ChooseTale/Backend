export class GameThumbnailDomainEntity {
  id: number;
  destination: string;
  gameId: number;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(id: number, destination: string, gameId: number) {
    this.id = id;
    this.destination = destination;
    this.gameId = gameId;
  }
}
