import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsershowService } from './usershow.service'; 
import { User } from 'src/user/user.entity';

@Controller('usershow')
export class UsershowController {
  constructor(private readonly usershowService: UsershowService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usershowService.getAllUsers();
  }


  
  @Delete(':id') 
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.usershowService.deleteUserById(id);
    return { message: 'User deleted successfully' };
  }

}
