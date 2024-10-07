import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UseraccountController } from 'src/useraccount/useraccount.controller';
import { UseraccountModule } from 'src/useraccount/useraccount.module';
import { UseraccountService } from 'src/useraccount/useraccount.service';




@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,UseraccountService],
  exports: [UserService,UseraccountService],
})
export class UserModule {}

