import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param,HttpException } from '@nestjs/common';
import { UserAccountService } from './useraccount.service';
import { User } from 'src/user/user.entity'; 
import { UserService } from 'src/user/user.service';
import { AuthDto } from 'src/user/user.dto';
@Controller('user-account') 
export class UseraccountController {
  constructor(private readonly userService: UserService){}
  
    
}
