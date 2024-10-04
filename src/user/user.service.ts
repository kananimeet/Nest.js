import { Body, Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UserAccountService } from 'src/useraccount/useraccount.service';


@Injectable()
export class UserService {
  
 
   constructor(
  @InjectRepository(User) private readonly userRegister: Repository<User>,
  private readonly userAccountService: UserAccountService,
) {}


      async create(
      firstname: string,
      lastname:string,
      nickname:string,
      email:string,
      password:string,
      confirmpassword:string): Promise<User> {

      const hashedPassword = await bcrypt.hash(password,10);  
      const user = this.userRegister.create({firstname,lastname,nickname, email, password: hashedPassword,confirmpassword: hashedPassword});
      return this.userRegister.save(user);
    }

  
    async findByEmail(email: string): Promise<User> {
     return this.userRegister.findOne({ where: { email } });
  }

 
  async deleteById(id: number): Promise<void> {
    await this.userRegister.delete(id);
  }  

    
    async handleUserAccount(user: User): Promise<void> {
        await this.userAccountService.processUserAccount(user);
    }
}
