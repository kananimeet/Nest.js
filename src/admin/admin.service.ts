import { Injectable,NotFoundException } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {

 constructor(@InjectRepository(Admin)private readonly adminRegister:Repository<Admin>,){}
  
 async Create
 (
    AdminName:string,
    Email:string,
    Password:string
 ) : Promise<Admin> {

    const hashedPassword = await bcrypt.hash(Password,10); 
    const admin = await this.adminRegister.create({AdminName,Email,Password:hashedPassword});
    return this.adminRegister.save(admin);
 }

 async findByEmail(Email: string): Promise<Admin> {
    return this.adminRegister.findOne({ where: { Email } });
  }

  async deleteById(id: number): Promise<void> {
    await this.adminRegister.delete(id);
  }  

  

  async update(
   id: number,
   updateData: Partial<{ AdminName: string; Email: string; Password: string }>,
 ): Promise<Admin> {
   const admin = await this.adminRegister.findOneById(id);
   if (!admin) {
     throw new NotFoundException('Admin not found');
   }

   
   if (updateData.Password) {
     updateData.Password = await bcrypt.hash(updateData.Password, 10);
   }

  
   Object.assign(admin, updateData);
   return this.adminRegister.save(admin);
 }

  

}
