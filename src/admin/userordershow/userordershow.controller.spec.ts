import { Test, TestingModule } from '@nestjs/testing';
import { UserordershowController } from './userordershow.controller';

describe('UserordershowController', () => {
  let controller: UserordershowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserordershowController],
    }).compile();

    controller = module.get<UserordershowController>(UserordershowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
