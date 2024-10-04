import { Module } from '@nestjs/common';
import { UserAccountService } from './useraccount.service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UseraccountController } from './useraccount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity if needed
  controllers:[UseraccountController],
  providers: [UserAccountService],
  exports: [UserAccountService],
})
export class UseraccountModule {}
