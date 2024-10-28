import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { UseraccountModule } from 'src/useraccount/useraccount.module';
import { UserModule } from 'src/user/user.module';



@Module({
  imports:[TypeOrmModule.forFeature([Product]),UseraccountModule,
],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService],
})
export class ProductModule {}
