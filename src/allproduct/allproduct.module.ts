import { Module } from '@nestjs/common';
import { AllproductService } from './allproduct.service';
import { ProductModule } from '../product/product.module'; 
import { AllproductController } from './allproduct.controller';

@Module({
  imports: [
    ProductModule,
  ],
  providers: [AllproductService],
  controllers:[AllproductController],
  exports: [AllproductService],
})
export class AllproductModule {}


