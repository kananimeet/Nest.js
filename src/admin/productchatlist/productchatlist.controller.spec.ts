import { Test, TestingModule } from '@nestjs/testing';
import { ProductchatlistController } from './productchatlist.controller';

describe('ProductchatlistController', () => {
  let controller: ProductchatlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductchatlistController],
    }).compile();

    controller = module.get<ProductchatlistController>(ProductchatlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
