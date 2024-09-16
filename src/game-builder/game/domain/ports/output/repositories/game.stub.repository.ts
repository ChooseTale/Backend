import { IGameRepository } from './game.repository.interface';

export const IGameStupRepository: IGameRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
};
