import { Test, TestingModule } from '@nestjs/testing';
import { ProductorderController } from './productorder.controller';

describe('ProductorderController', () => {
  let controller: ProductorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductorderController],
    }).compile();

    controller = module.get<ProductorderController>(ProductorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
