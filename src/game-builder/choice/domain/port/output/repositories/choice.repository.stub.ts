import { IChoiceRepository } from './choice.repository.interface';

export const IChoiceStubRepository: IChoiceRepository = {
  getAllByPageIds: jest.fn(),
  getOneById: jest.fn(),
  getAllByFromPageId: jest.fn(),
  getAllByToPageId: jest.fn(),
  create: jest.fn().mockImplementation((data) => {
    if (data) {
      return { id: 1 };
    } else {
      return null;
    }
  }),
  update: jest.fn(),
  deleteMany: jest.fn(),
  deleteById: jest.fn(),
};
