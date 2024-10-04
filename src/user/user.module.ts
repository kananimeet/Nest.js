import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserAccountService } from 'src/useraccount/useraccount.service';



@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,UserAccountService],
  exports: [UserService,UserAccountService],
})
export class UserModule {}

