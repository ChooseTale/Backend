import { Inject, Injectable } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { CreatePageReqDto } from '../controllers/dto/create-page.dto';

@Injectable()
export class CreatePageUsecase {
  constructor(
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  public async create(gameId: number) {
    const pages = await this.pageService.getAllByGameId(gameId);
    const isStarting = pages.length === 0;

    const newPage = await this.pageService.create(gameId, isStarting);
    return {
      id: newPage.id,
      title: newPage.title,
    };
  }
}
