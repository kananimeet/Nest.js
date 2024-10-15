import { Test, TestingModule } from '@nestjs/testing';
import { ProductchatlistService } from './productchatlist.service';

describe('ProductchatlistService', () => {
  let service: ProductchatlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductchatlistService],
    }).compile();

    service = module.get<ProductchatlistService>(ProductchatlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
