import { Inject, Injectable } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { CreatePageReqDto } from '../controllers/dto/create-page.dto';

@Injectable()
export class CreatePageUsecase {
  constructor(
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  public async create(gameId: number, body: CreatePageReqDto) {
    const newPage = await this.pageService.create(gameId, body);
    return {
      id: newPage.id,
    };
  }
}
