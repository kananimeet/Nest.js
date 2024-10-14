// src/userchatlist/userchatlist.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserchatlistService } from './userchatlist.service';
import { UserchatlistController } from './userchatlist.controller';
import { ProductDetail } from 'src/userchat/chatdetails.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail])], 
  controllers: [UserchatlistController],
  providers: [UserchatlistService],
})
export class UserchatlistModule {}
