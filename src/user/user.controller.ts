import { Controller, Get, Post, Body, HttpException, Delete, Param, Req, UseGuards, Res,} from '@nestjs/common';
import { UserService } from './user.service';
import { UseraccountService } from 'src/useraccount/useraccount.service';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthDto, AuthDtos } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request,Response } from 'express' 

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAccountService: UseraccountService,
  ) {}

  @Post('register')
  async register(@Body() body: AuthDto): Promise<User> {
    try {
      if (body.password === body.confirmpassword) {
        const newUser = await this.userService.create(
          body.firstname,
          body.lastname,
          body.nickname,
          body.email,
          body.password,
          body.confirmpassword,
          body.imageUpload,
          body.address
        );

        await this.userAccountService.createOrUpdateUserAccount({
          firstname: body.firstname,
          lastname: body.lastname,
          nickname: body.nickname,
          email: body.email,
          imageUpload: body.imageUpload,
          address: body.address
        });

        return newUser;
      } else {
        throw new HttpException('Passwords do not match', 400);
      }
    } catch {
      throw new HttpException('Registration failed', 500);
    }
  }


  @Post('login')
  async login(@Body() body: AuthDtos) {
    const user = await this.userService.findByEmail(body.email);
    try {
      if (user && (await bcrypt.compare(body.password, user.password))) {
        const userAccount = await this.userAccountService.findByEmail(user.email);
        const token = await this.userService.generateJwt(user);

  
        await this.userAccountService.createOrUpdateUserAccount({
          firstname: user.firstname,
          lastname: user.lastname,
          nickname: user.nickname,
          email: user.email,
        });

        return {
          message: 'Login successful',
          welcome: user.firstname,
          profile: userAccount,
          accessToken: token,
        };
      } else {
        throw new HttpException('Invalid email or password', 401);
      }
    } catch {
      throw new HttpException('Login failed', 500);
    }
  }


  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.deleteById(id);
    return { message: 'User deleted successfully' };
  }



  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token not provided', 401);
    }

    await this.userService.logout(token); 
    res.status(200).send({ message: 'Logged out successfully' });
  }


}
