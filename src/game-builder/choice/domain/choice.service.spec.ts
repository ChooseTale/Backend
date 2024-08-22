import { ChoiceService } from './choice.service';

import { IChoiceRepository } from './port/output/repositories/choice.repository.interface';
import { IChoiceStubRepository } from './port/output/repositories/choice.repository.stub';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { PageStubService } from '@@src/game-builder/page/domain/ports/input/page.stub.service';
import { PageStubEntity } from '@@src/game-builder/page/domain/entities/page.stub.entity';

describe('ChoiceService', () => {
  let choiceService: ChoiceService;
  let choiceRepository: IChoiceRepository;
  let pageService: IPageService;

  beforeEach(() => {
    choiceRepository = IChoiceStubRepository;
    pageService = PageStubService;
    choiceService = new ChoiceService(choiceRepository, pageService);
  });
  //🟢
  describe('create', () => {
    it('should be defined', () => {
      expect(choiceService.create).toBeDefined();
    });

    it.each([
      {
        parentPageId: 1,
        childPageId: 2,
        title: 'title',
        description: 'description',
      },
      {
        parentPageId: 1,
        childPageId: undefined,
        title: 'title 2',
        description: 'description 2',
      },
    ])(
      'choice의 생성이 성공하고 생성된 choice를 반환한다',
      async (createChoiceReqDto) => {
        choiceRepository.getAllByFromPageId = jest
          .fn()
          .mockResolvedValue([{ id: 1 }, { id: 2 }]);
        choiceRepository.create = jest.fn().mockResolvedValue({ id: 1 });

        const choice = await choiceService.create(createChoiceReqDto);
        expect(choice).toBeDefined();
        expect(choice).toEqual({ id: 1 });
      },
    );

    it('🔴 choice는 페이지당 4개 생성 가능하다.', async () => {
      choiceRepository.getAllByFromPageId = jest
        .fn()
        .mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
      pageService.getOneById = jest.fn().mockResolvedValue(PageStubEntity);
      pageService.create = jest.fn().mockResolvedValue({ id: 1 });
      try {
        await choiceService.create({} as any);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it('🔴 fromPage가 없다면 에러를 던진다.', async () => {
      pageService.getOneById = jest.fn().mockResolvedValue(null);
      try {
        await choiceService.create({} as any);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});
