export class CreateGameThumbnailEntity {
  public destination: string;

  constructor(
    public readonly gameId: number,
    readonly file: Express.Multer.File,
  ) {
    this.destination = file.destination;
  }
}
