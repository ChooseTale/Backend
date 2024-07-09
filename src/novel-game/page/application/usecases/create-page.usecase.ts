import { Inject, Injectable } from '@nestjs/common';
import { IPageService } from '../services/page.service.interface';
import { CreatePageReqDto } from '../controllers/dto/create-page.dto';
import { ChatGPT } from '@@src/common/infrastructure/external/chat-gpt/chatgpt';

const chatGPT = new ChatGPT();

@Injectable()
export class CreatePageUsecase {
  constructor(
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  public async create(gameId: number, body: CreatePageReqDto) {
    const abridgedContent = await chatGPT.getAbridgedContent(body.content);

    const newPage = await this.pageService.create(
      gameId,
      abridgedContent,
      body,
    );
    return {
      id: newPage.id,
    };
  }
}
