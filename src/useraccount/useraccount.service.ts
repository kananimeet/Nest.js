import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserAccountService {
    constructor(
        @InjectRepository(User) private readonly userAccountRepo: Repository<User>,
    ) {}

    
    
      async processUserAccount(user: User): Promise<any> {
        return {
          firstname: user.firstname,
          lastname: user.lastname,
          nickname: user.nickname,
          email: user.email,
        };
      } 
}
