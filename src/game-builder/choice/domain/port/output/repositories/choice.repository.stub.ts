import { IChoiceRepository } from './choice.repository.interface';

export const IChoiceStubRepository: IChoiceRepository = {
  getAllByPageIds: jest.fn(),
  getOneById: jest.fn(),
  getAllByPageId: jest.fn(),
  create: jest.fn().mockImplementation((data) => {
    if (data) {
      return { id: 1 };
    } else {
      return null;
    }
  }),
  update: jest.fn(),
};
