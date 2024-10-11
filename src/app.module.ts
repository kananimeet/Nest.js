import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { UseraccountController } from './useraccount/useraccount.controller';
import { UseraccountModule } from './useraccount/useraccount.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsershowController } from './admin/usershow/usershow.controller';
import { UsershowService } from './admin/usershow/usershow.service';
import { UsershowModule } from './admin/usershow/usershow.module';
import { UserproductController } from './admin/userproduct/userproduct.controller';
import { UserproductService } from './admin/userproduct/userproduct.service';
import { UserproductModule } from './admin/userproduct/userproduct.module';
import { UserchatController } from './userchat/userchat.controller';
import { UserchatService } from './userchat/userchat.service';
import { UserchatModule } from './userchat/userchat.module';
import { ChatshowController } from './chatshow/chatshow.controller';
import { ChatshowService } from './chatshow/chatshow.service';
import { ChatshowModule } from './chatshow/chatshow.module';



@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'devloper',
        database: 'nest_js',
        synchronize: true,
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      
      
      UserModule,
      AdminModule,
      ProductModule,
      UseraccountModule,
      UsershowModule,
      UserproductModule,
      UserchatModule,
      ChatshowModule,
      
       
    ],
  
controllers: [UseraccountController, UsershowController, UserproductController, UserchatController, ChatshowController],
  
providers: [UsershowService, UserproductService, UserchatService, ChatshowService],
    
})
export class AppModule {}
