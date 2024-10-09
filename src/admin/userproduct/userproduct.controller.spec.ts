import { Test, TestingModule } from '@nestjs/testing';
import { UserproductController } from './userproduct.controller';

describe('UserproductController', () => {
  let controller: UserproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserproductController],
    }).compile();

    controller = module.get<UserproductController>(UserproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
