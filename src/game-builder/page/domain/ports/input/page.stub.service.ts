import { PageStubEntity } from '../../entities/page.stub.entity';
import { IPageService } from './page.service.interface';

export const PageStubService: IPageService = {
  getAllByGameId: jest.fn(),
  getOneById: jest.fn().mockResolvedValue(PageStubEntity),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
