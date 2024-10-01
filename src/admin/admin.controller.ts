import { Controller,Get,Post,Delete,Body,Param,Put} from '@nestjs/common';
import { AdminService} from './admin.service';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

  class AdminDto{

  @IsNotEmpty()
  @IsString()  
  AdminName: string;

  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  Password: string
}

@Controller('admin')
export class AdminController {

constructor(private readonly adminService: AdminService){}

@Post('register')

async register(@Body() body:AdminDto): Promise<Admin>{
    return await this.adminService.Create(body.AdminName,body.Email,body.Password);
    }

    @Post('login')
    async login(@Body() body: AdminDto) {
      const user = await this.adminService.findByEmail(body.Email);
      if (user && (await bcrypt.compare(body.Password, user.Password))){
        return { message: 'Login successful', Welcome: user.AdminName };
      }
      return { message: 'Not Match Password' };
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
