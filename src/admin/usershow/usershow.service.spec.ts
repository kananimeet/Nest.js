import { Test, TestingModule } from '@nestjs/testing';
import { UsershowService } from './usershow.service';

describe('UsershowService', () => {
  let service: UsershowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsershowService],
    }).compile();

    service = module.get<UsershowService>(UsershowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
