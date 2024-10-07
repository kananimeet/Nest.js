import { Controller, Get, Post, Body, HttpException, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UseraccountService } from 'src/useraccount/useraccount.service';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthDto, AuthDtos } from './user.dto';

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
          body.confirmpassword
        );

        await this.userAccountService.createOrUpdateUserAccount({
          firstname: body.firstname,
          lastname: body.lastname,
          nickname: body.nickname,
          email: body.email,
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
        return {
          message: 'Login successful',
          Welcome: user.firstname,
          profile: userAccount,
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
}

