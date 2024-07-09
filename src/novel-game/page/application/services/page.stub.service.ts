import { PageStubEntity } from '../../domain/entities/page.stub.entity';
import { IPageService } from './page.service.interface';

export const PageStubService: IPageService = {
  getOneById: jest.fn().mockResolvedValue(PageStubEntity),
  create: jest.fn(),
};
