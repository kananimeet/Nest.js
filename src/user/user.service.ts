import { Body, Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
 
  constructor(@InjectRepository(User)private readonly userRegister: Repository<User>,) {}

    async create(
    Firstname: string,
    Last_name:string,
    Nickname:string,
    Email:string,
    Password:string,
    Conf_Password:string): Promise<User> {

    const hashedPassword = await bcrypt.hash(Password,10);  
    const user = this.userRegister.create({Firstname,Last_name,Nickname, Email, Password: hashedPassword,Conf_Password: hashedPassword});
    return this.userRegister.save(user);
  }

  
    async findByEmail(Email: string): Promise<User> {
     return this.userRegister.findOne({ where: { Email } });
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



