import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  private tokenBlacklist: string[];

  constructor(
    @InjectRepository(Admin)
    private readonly adminRegister: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {
    this.tokenBlacklist = [];
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    return this.adminRegister.findOne({ where: { email } });
  }

  async create(adminname: string, email: string, password: string): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRegister.create({ adminname, email, password: hashedPassword });
    return this.adminRegister.save(admin);
  }

  async generateJwtToken(admin: Admin): Promise<string> {
    const payload = { adminname: admin.adminname, email: admin.email };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(token);
      return !this.isTokenBlacklisted(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async deleteById(id: number): Promise<void> {
    await this.adminRegister.delete(id);
  }

  async update(
    id: number,
    updateData: Partial<{ adminname: string; email: string; password: string }>,
  ): Promise<Admin> {
    const admin = await this.adminRegister.findOneById(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    Object.assign(admin, updateData);
    return this.adminRegister.save(admin);
  }

  async logout(token: string): Promise<void> {
    this.tokenBlacklist.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.includes(token);
  }
}
