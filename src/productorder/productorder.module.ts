import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductorderService } from './productorder.service';
import { ProductorderController } from './productorder.controller';
import { ProductModule } from 'src/product/product.module';
import { UseraccountModule } from 'src/useraccount/useraccount.module';
import { Order } from './order.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductModule,
    UseraccountModule,
  ],
  controllers: [ProductorderController],
  providers: [ProductorderService],
  exports:[ProductorderService]
})
export class ProductorderModule {}
