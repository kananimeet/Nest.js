import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UseraccountService } from './useraccount.service';
import { UseraccountController } from './useraccount.controller';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from 'src/product/product.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [UseraccountService],
  exports: [UseraccountService],
})
export class UseraccountModule {}
