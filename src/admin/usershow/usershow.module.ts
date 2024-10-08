import { Module } from '@nestjs/common';
import { UsershowService } from './usershow.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule], // Import UserModule here
  providers: [UsershowService],
  exports: [UsershowService], // Export if needed in other modules
})
export class UsershowModule {}
