import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserchatlistService } from './userchatlist.service';
import { UserchatlistController } from './userchatlist.controller';
import { ProductChat } from 'src/userchat/userchat.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([ProductChat])], 
  controllers: [UserchatlistController],
  providers: [UserchatlistService],
  exports:[UserchatlistService]
})
export class UserchatlistModule {}
