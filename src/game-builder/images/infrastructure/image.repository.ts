import { Injectable } from '@nestjs/common';
import { IImageRepository } from '../domain/port/output/image.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { GameThumbnailDomainEntity } from '../domain/entities/game-thumnail.entity';
import { toCreateEntity, toDomainEntity } from './mapper/game-thumbnail.mapper';
import { CreateGameThumbnailEntity } from '../domain/entities/create-game-thumbnail.entity';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async uploadImageForGameThumbnail(
    gameThumbnail: CreateGameThumbnailEntity,
  ): Promise<GameThumbnailDomainEntity> {
    const image = toCreateEntity(gameThumbnail);
    const newImage = await this.prisma.image.create({
      data: {
        ...image,
      },
    });
    return toDomainEntity(newImage);
  }

  async deleteImageGameThumbnail(
    imageId: number,
    gameId: number,
  ): Promise<void> {
    await this.prisma.image.delete({
      where: {
        id: imageId,
        gameId,
      },
    });
  }
}
