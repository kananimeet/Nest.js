import { HttpException, Injectable,NotFoundException } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {

 constructor(@InjectRepository(Admin)private readonly adminRegister:Repository<Admin>,){}
  
 async Create
 (
    adminname:string,
    email:string,
    password:string
 ) : Promise<Admin> {
    try{
    const hashedPassword = await bcrypt.hash(password,10); 
    const admin = await this.adminRegister.create({adminname,email,password:hashedPassword});
    return this.adminRegister.save(admin);
    }
    catch{
      throw new HttpException("Not registered Admin", 500)
    }
 }

 async findByEmail(email: string): Promise<Admin> {
    return this.adminRegister.findOne({ where: { email } });
  }

  async deleteById(id: number): Promise<void> {
    await this.adminRegister.delete(id);
  }  

  

  async update(
   id: number,
   updateData: Partial<{ adminname: string; email: string; password: string }>,
 ): Promise<Admin> {
   const admin = await this.adminRegister.findOneById(id);
   if (!admin) {
     throw new NotFoundException('Admin not found');
   }

   
   if (updateData.password) {
     updateData.password = await bcrypt.hash(updateData.password, 10);
   }

  
   Object.assign(admin, updateData);
   return this.adminRegister.save(admin);
 }

  

}
