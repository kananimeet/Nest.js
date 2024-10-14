import { Test, TestingModule } from '@nestjs/testing';
import { UserchatlistController } from './userchatlist.controller';

describe('UserchatlistController', () => {
  let controller: UserchatlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserchatlistController],
    }).compile();

    controller = module.get<UserchatlistController>(UserchatlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
