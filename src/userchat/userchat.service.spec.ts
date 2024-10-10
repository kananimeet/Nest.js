import { Test, TestingModule } from '@nestjs/testing';
import { UserchatService } from './userchat.service';

describe('UserchatService', () => {
  let service: UserchatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserchatService],
    }).compile();

    service = module.get<UserchatService>(UserchatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
