import { Test, TestingModule } from '@nestjs/testing';
import { UserordershowService } from './userordershow.service';

describe('UserordershowService', () => {
  let service: UserordershowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserordershowService],
    }).compile();

    service = module.get<UserordershowService>(UserordershowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
