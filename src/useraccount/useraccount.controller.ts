import { Controller, Get, Param, Put, Body, Delete, HttpException, UseGuards, Req,Request } from '@nestjs/common';
import { UseraccountService } from './useraccount.service';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('useraccount')
export class UseraccountController {
constructor(private readonly userAccountService: UseraccountService) {}


  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  async getProfile(@Req() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const userProfile = await this.userAccountService.getUserFromToken(token); 

    if (!userProfile) {
      throw new HttpException('User not found', 404);
    }
      return userProfile;
  }
 

@UseGuards(JwtAuthGuard)
@Put('account')
async updateAccount(@Request() req, @Body() body: Partial<User>) {
  const token = req.headers.authorization.split(' ')[1]; 
  const decoded = await this.userAccountService.verifyToken(token); 
  const email = decoded.email; 
  return this.userAccountService.updateUserAccount(email, body);
}
 

  @UseGuards(JwtAuthGuard)
  @Delete('account')
  async deleteAccount(@Request() req) {
    const token = req.headers.authorization.split(' ')[1]; 
    await this.userAccountService.deleteUserAccount(token);
    return { message: 'User account deleted successfully' };
  }
}




