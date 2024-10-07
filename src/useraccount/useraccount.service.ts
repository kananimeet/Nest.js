import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';  


@Injectable()
export class UseraccountService {
constructor( @InjectRepository(User) private readonly userAccount: Repository<User>,) {}

  async createOrUpdateUserAccount(userAccountData: Partial<User>): Promise<User> {
  const existingUserAccount = await this.userAccount.findOne({
  where: { email: userAccountData.email },
    });

  return existingUserAccount
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
        },
    };
  }
  
  
  async updateUserAccount(email: string, userAccountData: Partial<User>): Promise<User> {
    const existingUserAccount = await this.userAccount.findOne({ where: { email } });

    if (!existingUserAccount) {
        throw new NotFoundException('User account not found');
    }

    Object.assign(existingUserAccount, userAccountData);
    return this.userAccount.save(existingUserAccount);
}



async deleteUserAccount(email: string): Promise<void> {
    const userAccount = await this.userAccount.findOne({ where: { email } });

    if (!userAccount) {
        throw new NotFoundException('User account not found');
    }

    await this.userAccount.remove(userAccount);
}

}
