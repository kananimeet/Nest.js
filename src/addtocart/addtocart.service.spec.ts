import { Test, TestingModule } from '@nestjs/testing';
import { AddtocartService } from './addtocart.service';

describe('AddtocartService', () => {
  let service: AddtocartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddtocartService],
    }).compile();

    service = module.get<AddtocartService>(AddtocartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
