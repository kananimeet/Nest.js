import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserchatService } from './userchat.service';
import { UserModule } from '../user/user.module'; 
import { ChatData } from './userchat.entity'; 
import { ProductModule } from 'src/product/product.module';
import { UserchatController } from './userchat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatData]), 
    UserModule, ProductModule
  ],
  providers: [UserchatService],
  controllers:[UserchatController],
  exports: [UserchatService], 
})
export class UserchatModule {}
