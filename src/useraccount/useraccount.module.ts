import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UseraccountService } from './useraccount.service';
import { UseraccountController } from './useraccount.controller';
import { User } from 'src/user/user.entity';


@Module({
  imports: [
  TypeOrmModule.forFeature([User]), // Register the UserAccount entity
],
  providers: [UseraccountService],
  controllers:[UseraccountController],
  exports: [UseraccountService], 
})
export class UseraccountModule {}
