import { Test, TestingModule } from '@nestjs/testing';
import { ChatshowService } from './chatshow.service';

describe('ChatshowService', () => {
  let service: ChatshowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatshowService],
    }).compile();

    service = module.get<ChatshowService>(ChatshowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
