import { Test, TestingModule } from '@nestjs/testing';
import { UsershowController } from './usershow.controller';

describe('UsershowController', () => {
  let controller: UsershowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsershowController],
    }).compile();

    controller = module.get<UsershowController>(UsershowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
