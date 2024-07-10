import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IChoiceRepository } from '../domain/repositories/choice.repository.interface';
import { CreateChoiceReqDto } from '../applications/controllers/dto/create-choice.dto';
import { Prisma } from '@prisma/client';
import { IPageService } from '@@src/novel-game/page/application/services/page.service.interface';
import { IChoiceService } from '../applications/services/choice.service.interface';
import {
  UpdateChoiceReqDto,
  UpdateChoiceResDto,
} from '../applications/controllers/dto/update-choice.dto';
import { ChoiceDomainEntity } from '../domain/entities/choice.entity';

@Injectable()
export class ChoiceService implements IChoiceService {
  constructor(
    @Inject('choiceRepositoryInterface')
    private readonly choiceRepository: IChoiceRepository,
    @Inject('IPageService') private readonly pageService: IPageService,
  ) {}

  async getAllByPageId(pageId: number, transaction: Prisma.TransactionClient) {
    return this.choiceRepository.getAllByPageId(pageId, transaction);
  }

  async getOneById(id: number, transaction: Prisma.TransactionClient) {
    return this.choiceRepository.getOneById(id, transaction);
  }

  async create(
    createChoiceReqDto: CreateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ) {
    const pageChoices = await this.choiceRepository.getAllByPageId(
      createChoiceReqDto.parentPageId,
      transaction,
    );

    if (pageChoices.length > 3) {
      throw new ConflictException('초이스는 4개까지만 생성 가능합니다.');
    }

    const fromPage = await this.pageService.getOneById(
      createChoiceReqDto.parentPageId,
      transaction,
    );

    if (!fromPage) {
      throw new NotFoundException('해당 페이지가 존재하지 않습니다.');
    }

    fromPage.checkIsEnding();

    if (createChoiceReqDto.childPageId) {
      const childPage = await this.pageService.getOneById(
        createChoiceReqDto.childPageId,
        transaction,
      );
      if (!childPage) {
        throw new NotFoundException('해당 페이지가 존재하지 않습니다.');
      }
    }

    const choice = await this.choiceRepository.create(
      pageChoices.length + 1,
      createChoiceReqDto,
      transaction,
    );
    return choice;
  }

  async update(
    id: number,
    body: UpdateChoiceReqDto,
    transaction: Prisma.TransactionClient,
  ): Promise<ChoiceDomainEntity> {
    const choice = await this.choiceRepository.getOneById(id, transaction);
    if (!choice) {
      throw new NotFoundException('해당 선택지가 존재하지 않습니다.');
    }

    choice.setTitle(body.title);
    choice.setDescription(body.description);
    choice.setParentPageId(body.parentPageId);
    choice.setChildPageId(body.childPageId);

    const updatedChoice = await this.choiceRepository.update(
      choice,
      transaction,
    );
    return updatedChoice;
  }
}
