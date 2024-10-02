import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';



@Module({
  
imports: [TypeOrmModule.forRoot({
    type:'postgres',
    username:'postgres',
    password:'devloper',
    port:5432,
    host:'localhost',
    database:'nest_js',
    synchronize:true,
    autoLoadEntities:true,   
  }),
  
    UserModule,
  
    AdminModule,
  
    ProductModule,
],
    
})
export class AppModule {}
