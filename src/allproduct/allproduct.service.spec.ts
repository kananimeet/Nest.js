import { Test, TestingModule } from '@nestjs/testing';
import { AllproductService } from './allproduct.service';

describe('AllproductService', () => {
  let service: AllproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllproductService],
    }).compile();

    service = module.get<AllproductService>(AllproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
