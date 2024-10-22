import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserchatlistModule } from './userchatlist/userchatlist.module'; 
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { UseraccountModule } from './useraccount/useraccount.module';
import { UsershowModule } from './admin/usershow/usershow.module';
import { UserproductModule } from './admin/userproduct/userproduct.module';
import { UserchatModule } from './userchat/userchat.module';
import { UsershowService } from './admin/usershow/usershow.service';
import { UserproductService } from './admin/userproduct/userproduct.service';
import { UseraccountController } from './useraccount/useraccount.controller';
import { UsershowController } from './admin/usershow/usershow.controller';
import { UserproductController } from './admin/userproduct/userproduct.controller';
import { UserchatController } from './userchat/userchat.controller';
import { UserchatlistController } from './userchatlist/userchatlist.controller';
import { ProductchatlistModule } from './admin/productchatlist/productchatlist.module';
import { AllproductModule } from './allproduct/allproduct.module';
import { AddtocartController } from './addtocart/addtocart.controller';
import { AddtocartModule } from './addtocart/addtocart.module';
import { ProductorderController } from './productorder/productorder.controller';
import { ProductorderModule } from './productorder/productorder.module';
import { UserordershowService } from './admin/userordershow/userordershow.service';
import { UserordershowController } from './admin/userordershow/userordershow.controller';
import { UserordershowModule } from './admin/userordershow/userordershow.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'devloper',
      database: 'nest_js', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,

    }),
    UserModule,
    UserchatlistModule,
    ProductchatlistModule,
    AdminModule,
    ProductModule,
    UseraccountModule,
    UsershowModule,
    UserproductModule,
    UserchatModule,
    AllproductModule,
    AddtocartModule,
    ProductorderModule,
    UserordershowModule,
  ],

 providers: [UsershowService, UserproductService, UserordershowService],
 controllers: [
              UseraccountController,
              UsershowController,
              UserproductController,
              UserchatController,
              UserchatlistController, 
              AddtocartController,
              ProductorderController,
              UserordershowController
            ],

})
export class AppModule {}