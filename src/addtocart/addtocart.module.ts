import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddtocartService } from './addtocart.service';
import { AddtocartController } from './addtocart.controller';
import { Addtocart } from './addtocart.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';
import { UseraccountModule } from 'src/useraccount/useraccount.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Addtocart,Product]),
        UserModule,UseraccountModule
    ],
    providers: [AddtocartService,ProductService],
    controllers: [AddtocartController],
    exports: [AddtocartService],
})
export class AddtocartModule {}


