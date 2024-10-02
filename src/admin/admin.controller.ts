import { Controller,Get,Post,Delete,Body,Param,Put} from '@nestjs/common';
import { AdminService} from './admin.service';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

  class AdminDto{

  @IsNotEmpty()
  @IsString()  
  adminname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string
}

class AdminDtos{
  @IsEmail()
  email:string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password:string;
}

@Controller('admin')
export class AdminController {

constructor(private readonly adminService: AdminService){}

@Post('register')

async register(@Body() body:AdminDto): Promise<Admin>{
    return await this.adminService.Create(body.adminname,body.email,body.password);
    }

    @Post('login')
    async login(@Body() body: AdminDtos) {
      const user = await this.adminService.findByEmail(body.email);
      try{
      if (user && (await bcrypt.compare(body.password, user.password))){
        return { message: 'Login successful', Welcome: user.adminname };
      }
    }catch{
      return { message: 'Not Match Password' };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
  await this.adminService.deleteById(id);
  return { message: 'Admin deleted successfully' };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Admin) {
    const updatedAdmin = await this.adminService.update(id, body);
    return { message: 'Admin updated successfully', admin: updatedAdmin };
  }

}
