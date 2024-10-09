import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service'; 
import { User } from 'src/user/user.entity';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/admin.entity';
import { JwtPayload } from 'jsonwebtoken';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService,private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    });
  }

  async validate(payload: any): Promise<User> {
    return this.userService.findByEmail(payload.email); 
  }



  async validates(payload: any) {
    console.log('Payload:', payload); // Log the payload
    const admin = await this.adminService.findByEmail(payload.email);
    if (!admin) {
        console.log('Unauthorized - Admin not found'); // Log if admin not found
        throw new UnauthorizedException();
    }
    return admin;
}
}
