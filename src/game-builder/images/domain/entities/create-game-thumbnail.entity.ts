export class CreateGameThumbnailEntity {
  public url: string;

  constructor(
    public readonly gameId: number,
    readonly file: Express.Multer.File,
  ) {
    this.url = `${file.destination}/${file.filename}`;
  }
}
