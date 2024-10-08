import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class UsershowService {
  constructor(private readonly userService: UserService) {} // Inject UserService

  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll(); // Call the findAll method to get user data
  }


  async deleteUserById(id: number): Promise<void> {
    await this.userService.deleteById(id); // Call the deleteById method in UserService
  }


}
