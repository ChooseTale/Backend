import { PageStubEntity } from '../../entities/page.stub.entity';
import { IPageService } from './page.service.interface';

export const PageStubService: IPageService = {
  getOneById: jest.fn().mockResolvedValue(PageStubEntity),
  create: jest.fn(),
  update: jest.fn(),
};
