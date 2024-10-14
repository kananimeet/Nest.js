import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserchatlistModule } from './userchatlist/userchatlist.module'; 
import { UserChat } from './userchat/userchat.entity';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { UseraccountModule } from './useraccount/useraccount.module';
import { UsershowModule } from './admin/usershow/usershow.module';
import { UserproductModule } from './admin/userproduct/userproduct.module';
import { UserchatModule } from './userchat/userchat.module';
import { UsershowService } from './admin/usershow/usershow.service';
import { UserproductService } from './admin/userproduct/userproduct.service';
import { UserchatService } from './userchat/userchat.service';
import { UserchatlistService } from './userchatlist/userchatlist.service';
import { UseraccountController } from './useraccount/useraccount.controller';
import { UsershowController } from './admin/usershow/usershow.controller';
import { UserproductController } from './admin/userproduct/userproduct.controller';
import { UserchatController } from './userchat/userchat.controller';
import { UserchatlistController } from './userchatlist/userchatlist.controller';


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
    AdminModule,
    ProductModule,
    UseraccountModule,
    UsershowModule,
    UserproductModule,
    UserchatModule,
  ],

 providers: [UsershowService, UserproductService],
 controllers: [UseraccountController, UsershowController, UserproductController, UserchatController,UserchatlistController],

})
export class AppModule {}
