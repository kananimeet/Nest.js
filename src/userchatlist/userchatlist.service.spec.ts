import { Test, TestingModule } from '@nestjs/testing';
import { UserchatlistService } from './userchatlist.service';

describe('UserchatlistService', () => {
  let service: UserchatlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserchatlistService],
    }).compile();

    service = module.get<UserchatlistService>(UserchatlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
