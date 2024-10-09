import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity'; 
import { ProductModule } from 'src/product/product.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([Admin]),ProductModule,
  JwtModule.register({
    secret: 'your_jwt_secret_key',
    signOptions: { expiresIn: '1h' }, 
}),
],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]

})
export class AdminModule {}

