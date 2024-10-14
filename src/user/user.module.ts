import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UseraccountService } from 'src/useraccount/useraccount.service';
import { JwtModule } from '@nestjs/jwt';
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



// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
// import { UserService } from './user.service';
// import { User } from './user.entity';
// import { UseraccountService } from '../useraccount/useraccount.service'; // Adjust the path as necessary

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     JwtModule.register({
//       secret: 'yourSecretKey', // Replace with your actual secret or load from environment variables
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   providers: [UserService, UseraccountService],
//   exports: [UserService],
// })
// export class UserModule {}

