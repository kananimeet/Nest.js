import { Controller, Get, Delete, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { UsershowService } from './usershow.service';
import { User } from 'src/user/user.entity';

@Controller('usershow')
export class UsershowController {
  constructor(private readonly usershowService: UsershowService) {}

  @Get()
  async getAllUsers(@Headers('Authorization') authHeader: string): Promise<User[]> {
    const token = this.extractTokenFromHeader(authHeader);
    return this.usershowService.getAllUsers(token);
  }

  @Delete(':id')
  async deleteUserById(
    @Param('id') id: number,
    @Headers('Authorization') authHeader: string,
  ): Promise<void> {
    const token = this.extractTokenFromHeader(authHeader);
    await this.usershowService.deleteUserById(id, token);
  }

  private extractTokenFromHeader(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing authorization header');
    }
    return authHeader.split(' ')[1];
  }
}

