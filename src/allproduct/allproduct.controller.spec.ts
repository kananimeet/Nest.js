import { Test, TestingModule } from '@nestjs/testing';
import { AllproductController } from './allproduct.controller';

describe('AllproductController', () => {
  let controller: AllproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllproductController],
    }).compile();

    controller = module.get<AllproductController>(AllproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
