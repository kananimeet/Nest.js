import { Module } from '@nestjs/common';
import { UsershowService } from './usershow.service';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from '../admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UsershowController } from './usershow.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
    imports: [
    AdminModule,
    UserModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UsershowService, JwtStrategy],
  controllers: [UsershowController],
})
export class UsershowModule {}
