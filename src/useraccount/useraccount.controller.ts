import { Controller, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { UseraccountService } from './useraccount.service';
import { User } from '../user/user.entity';


@Controller('useraccount')
export class UseraccountController {
constructor(private readonly userAccountService: UseraccountService) {}


  @Get(':email')
  async findByEmail(@Param('email') email:string): Promise<{ profile: Partial<User>}> {
    return this.userAccountService.findByEmail(email);
  }


  @Put(':email/update')
  async updateUser(
      @Param('email') email: string,
      @Body() userAccountData: Partial<User>
  ): Promise<User> {
      return this.userAccountService.updateUserAccount(email, userAccountData);
  }

  
  @Delete(':email/delete')
  async deleteUser(@Param('email') email: string): Promise<void> {
      return this.userAccountService.deleteUserAccount(email);
  }

 
}
