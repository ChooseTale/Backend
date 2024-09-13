import { Image } from '@prisma/client';

export interface ImageRepositoryPort {
  getImageById(imageId: number): Promise<Image | null>;
}
