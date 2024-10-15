import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserchatService } from './userchat.service';
import { UserchatController } from './userchat.controller';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module'; 
import { UserchatlistModule } from '../userchatlist/userchatlist.module';
import { UserchatlistService } from 'src/userchatlist/userchatlist.service';
import { ProductChat } from './userchat.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProductChat]),
    UserModule, 
    ProductModule, 
    UserchatlistModule, 
  ],
  providers: [UserchatService,UserchatlistService],
  controllers: [UserchatController],
  exports: [UserchatService],
})
export class UserchatModule {}
