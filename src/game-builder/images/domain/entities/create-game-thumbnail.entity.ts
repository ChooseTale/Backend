export class CreateGameThumbnailEntity {
  constructor(
    public readonly gameId: number,
    public readonly url: string,
  ) {
    this.url = url;
  }
}
