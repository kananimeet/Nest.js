import { Controller,Get, Post, Body, HttpException,Delete,Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

class AuthDto {

  @IsNotEmpty()
  @IsString()
  Firstname: string;

  @IsNotEmpty()
  @IsString()
  Last_name: string;

  @IsNotEmpty()
  @IsString()
  Nickname: string;

  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  Password: string;

  @IsNotEmpty()
 Conf_Password: string;
}

// login Dto
class AuthDtos{
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  Password: string;   
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  

  @Post('register')
    async register(@Body() body: AuthDto): Promise<User> {
    if(body.Password === body.Conf_Password){  
     
      return this.userService.create(body.Firstname, body.Last_name,body.Nickname, body.Email, body.Password,body.Conf_Password,);
    }
  throw new HttpException("Not match Conf_Password",404);
}


// @Get()
// public async getUser(): Promise<User[]> {
//   try {
//       const finds = await this.userService.getUser();
//       return finds;
//   } 
//   catch (error) {
//       throw new HttpException ('No User Found',404);
//   }
// }




  @Post('login')
  async login(@Body() body: AuthDtos) {
    const user = await this.userService.findByEmail(body.Email);
    if (user && (await bcrypt.compare(body.Password, user.Password))){
      return { message: 'Login successful', Welcome: user.Firstname };
    }
    return { message: 'Not Match Password' };
  }

  
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.deleteById(id);
    return { message: 'User deleted successfully' };
  }


}
