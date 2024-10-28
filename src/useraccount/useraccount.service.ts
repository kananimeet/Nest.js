import {Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';  
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UseraccountService {
  constructor(
    @InjectRepository(User) private readonly userAccount: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

    async UserAccount(userAccountData: Partial<User>): Promise<User> {
    const existingUserAccount = await this.userAccount.findOne({
    where: { email: userAccountData.email },
    });
    
    if (!existingUserAccount) {
    const newUserAccount = this.userAccount.create(userAccountData);
    return this.userAccount.save(newUserAccount);
    }
  
    Object.assign(existingUserAccount, userAccountData);
    return this.userAccount.save(existingUserAccount);
  }

  async findByEmail(email: string): Promise<{ profile: Partial<User> }> {
    const userAccount = await this.userAccount.findOne({ where: { email } });
    if (!userAccount) {
      return null; 
    }

    return {
      profile: {
        firstname: userAccount.firstname,
        lastname: userAccount.lastname,
        nickname: userAccount.nickname,
        email: userAccount.email,
        imageUpload:userAccount.imageUpload,
        address:userAccount.address
      },
    };
  }
  async getUserFromToken(token: string): Promise<Partial<User>> {
    try {
      const decoded = this.jwtService.verify(token);
      const email = decoded.email; 

      const userAccount = await this.findByEmail(email);
      if (!userAccount) {
        throw new NotFoundException('User account not found');
      }
 
      return userAccount.profile;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async updateUserAccount(email: string, userAccountData: Partial<User>): Promise<User> {
    const existingUserAccount = await this.userAccount.findOne({ where: { email } });

    if (!existingUserAccount) {
        throw new NotFoundException('User account not found');
    }

    Object.assign(existingUserAccount, userAccountData);
    return this.userAccount.save(existingUserAccount);
}

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
}

  async deleteUserAccount(token: string): Promise<void> {
    const userProfile = await this.getUserFromToken(token);
    if (!userProfile) {
      throw new NotFoundException('User account not found');
    }
    const existingUserAccount = await this.userAccount.findOne({ where: { email: userProfile.email } });
    if (!existingUserAccount) {
      throw new NotFoundException('User account not found');
    }

    await this.userAccount.remove(existingUserAccount);
  }

}
