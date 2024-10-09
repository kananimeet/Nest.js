import { Controller,Get,Post,Delete,Body,Param,Put, UnauthorizedException, HttpException, Req, Res} from '@nestjs/common';
import { AdminService} from './admin.service';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';
import { AdminDto,AdminDtos } from './admin.dto';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';
import { JwtService } from '@nestjs/jwt';
import { Request,Response } from 'express' 
 
@Controller('admin')
export class AdminController {

constructor(private readonly adminService: AdminService,
  private readonly productService: ProductService,
  private readonly jwtService: JwtService,)
{}

@Post('register')
async register(@Body() body: AdminDto): Promise<Admin> {
    return await this.adminService.create(body.adminname, body.email, body.password);
}

@Post('login')
async login(@Body() body: AdminDtos) {
    const user = await this.adminService.findByEmail(body.email);
    try {
        if (user && (await bcrypt.compare(body.password, user.password))) {
            const token = await this.adminService.generateJwtToken(user); 
            return { message: 'Login successful', token, welcome: user.adminname };
        }
    } catch (error) {
        return { message: 'Login failed', error: error.message };
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

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token not provided', 401);
    }

    await this.adminService.logout(token); 
    res.status(200).send({ message: 'Logged out successfully' });
  }


}
