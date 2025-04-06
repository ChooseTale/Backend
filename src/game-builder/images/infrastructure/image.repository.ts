import { Injectable } from '@nestjs/common';
import { IImageRepository } from '../domain/port/output/image.repository.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { GameThumbnailDomainEntity } from '../domain/entities/game-thumnail.entity';
import { toCreateEntity, toDomainEntity } from './mapper/game-thumbnail.mapper';
import { CreateGameThumbnailEntity } from '../domain/entities/create-game-thumbnail.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(imageId: number): Promise<GameThumbnailDomainEntity | null> {
    const image = await this.prisma.image.findUnique({
      where: {
        id: imageId,
      },
    });

    if (!image) {
      return null;
    }

    return toDomainEntity(image);
  }

  async getAllByGameId(gameId: number): Promise<GameThumbnailDomainEntity[]> {
    const images = await this.prisma.image.findMany({
      where: {
        gameId,
      },
    });
    return images.map(toDomainEntity);
  }

  async uploadImageForGameThumbnail(
    gameThumbnail: CreateGameThumbnailEntity,
    transaction?: Prisma.TransactionClient,
  ): Promise<GameThumbnailDomainEntity> {
    const image = toCreateEntity(gameThumbnail);
    const newImage = await (transaction ?? this.prisma).image.create({
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
