import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductchatlistService } from './productchatlist.service';
import { ProductchatlistController } from './productchatlist.controller';
import { UserchatlistService } from 'src/userchatlist/userchatlist.service';
import { ProductChat } from 'src/userchat/userchat.entity'; 
import { AdminModule } from 'src/admin/admin.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductChat]),
    AdminModule,
  ],
  controllers: [ProductchatlistController],
  providers: [ProductchatlistService, UserchatlistService,],
})
export class ProductchatlistModule {}
