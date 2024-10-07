import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { UseraccountController } from './useraccount/useraccount.controller';
import { UseraccountModule } from './useraccount/useraccount.module';


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
      }),
      
      UserModule,
      AdminModule,
      ProductModule,
      UseraccountModule,  
    ],
  
controllers: [UseraccountController],
    
})
export class AppModule {}
