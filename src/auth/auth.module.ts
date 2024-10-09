// auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service'; // Adjust the import as necessary
import { JwtStrategy } from './jwt.strategy';
import { UseraccountService } from 'src/useraccount/useraccount.service'; // Adjust the import as necessary

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Use your own secret key
      signOptions: { expiresIn: '60s' }, // Adjust expiration time as needed
    }),
  ],
  providers: [UserService, JwtStrategy, UseraccountService],
  exports: [UserService, JwtStrategy],
})
export class AuthModule {}


