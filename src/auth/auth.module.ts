import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service'; 
import { JwtStrategy } from './jwt.strategy';
import { UseraccountService } from 'src/useraccount/useraccount.service'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', 
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, JwtStrategy, UseraccountService],
  exports: [UserService, JwtStrategy],
})
export class AuthModule {}


