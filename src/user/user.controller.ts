import { Controller,Get, Post, Body, HttpException,Delete,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {AuthDto,AuthDtos}from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
    async register(@Body() body: AuthDto): Promise<User> {
    try
  {  
    if(body.password === body.confirmpassword){  
     
      return this.userService.create(body.firstname, body.lastname,body.nickname, body.email, body.password,body.confirmpassword,);
    }
  }
  catch
  {
    throw new HttpException("Not match Conf_Password",505);
  }
}


  @Post('login')
  async login(@Body() body: AuthDtos) {
    const user = await this.userService.findByEmail(body.email);
    try{
    if (user && (await bcrypt.compare(body.password, user.password))){
      return { message: 'Login successful', Welcome: user.firstname };
    }
  }catch {
    return { message: 'Not Match Password' };
  }
}

  
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.deleteById(id);
    return { message: 'User deleted successfully' };
  }


}
