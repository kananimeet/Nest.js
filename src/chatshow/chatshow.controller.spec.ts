import { Test, TestingModule } from '@nestjs/testing';
import { ChatshowController } from './chatshow.controller';

describe('ChatshowController', () => {
  let controller: ChatshowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatshowController],
    }).compile();

    controller = module.get<ChatshowController>(ChatshowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
