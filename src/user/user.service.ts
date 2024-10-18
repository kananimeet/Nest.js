import { Injectable, HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UseraccountService } from 'src/useraccount/useraccount.service';

@Injectable()
export class UserService {
  private tokenBlacklist: string[];
  
  constructor(
    @InjectRepository(User)
    private readonly userRegister: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userAccountService: UseraccountService, 
  )
  {
    this.tokenBlacklist = [];
  } 


  async getUserFromToken(token: string): Promise<User> {
    try {
      const decoded = this.jwtService.verify(token); 
      const user = await this.findByEmail(decoded.email); 
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      throw new HttpException('Invalid token', 401);
    }
  }


  async create(
    firstname: string,
    lastname: string,
    nickname: string,
    email: string,
    password: string,
    confirmpassword: string,
    imageUpload:string,
    address: string,
    
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRegister.create({
      firstname,
      lastname,
      nickname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      imageUpload,
      address
      
    });
    return this.userRegister.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRegister.findOne({ where: { email } });
  }
  async findAll(): Promise<User[]> {
    return this.userRegister.find(); 
  }
  
  async deleteById(id: number): Promise<void> {
    await this.userRegister.delete(id);
  }

  async generateJwt(user: User): Promise<string> {
    const payload = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      imageUpload: user.imageUpload,
      address: user.address
      
    };
    return this.jwtService.sign(payload);
  }
  async logout(token: string): Promise<void> {
    this.tokenBlacklist.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.includes(token);
  }

}




