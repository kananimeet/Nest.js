import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UseraccountController } from 'src/useraccount/useraccount.controller';
import { UseraccountModule } from 'src/useraccount/useraccount.module';
import { UseraccountService } from 'src/useraccount/useraccount.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AdminModule } from 'src/admin/admin.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),AdminModule,
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [UserService, UseraccountService,JwtStrategy],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}

