import { Body, Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
 
  constructor(@InjectRepository(User)private readonly userRegister: Repository<User>,) {}

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


  // async getUser(): Promise<User[]> {
  //  const find = await this.userRegister.find();
  // if(!find || !find[0])
  //     {
  //         throw new HttpException("not found",404);
  //     }

  //   return find;
  // }

 

}



