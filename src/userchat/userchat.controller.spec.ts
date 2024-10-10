import { Test, TestingModule } from '@nestjs/testing';
import { UserchatController } from './userchat.controller';

describe('UserchatController', () => {
  let controller: UserchatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserchatController],
    }).compile();

    controller = module.get<UserchatController>(UserchatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
