import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class UsershowService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}

  async getAllUsers(token: string): Promise<User[]> {
    const isValidToken = await this.adminService.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Access denied. Invalid token.');
    }
    return this.userService.findAll();
  }

  async deleteUserById(id: number, token: string): Promise<void> {
    const isValidToken = await this.adminService.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Access denied. Invalid token.');
    }
    await this.userService.deleteById(id);
  }
}
