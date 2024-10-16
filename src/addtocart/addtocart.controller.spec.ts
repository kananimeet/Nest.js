import { Test, TestingModule } from '@nestjs/testing';
import { AddtocartController } from './addtocart.controller';

describe('AddtocartController', () => {
  let controller: AddtocartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddtocartController],
    }).compile();

    controller = module.get<AddtocartController>(AddtocartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
