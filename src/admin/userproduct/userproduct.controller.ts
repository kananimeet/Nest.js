import { Controller, Delete, Get, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { Product } from 'src/product/product.entity';
import { UserproductService } from './userproduct.service';
import { ProductService } from 'src/product/product.service';
import { AdminService } from 'src/admin/admin.service';


@Controller('userproduct')
export class UserproductController {
  constructor(
    private readonly userProductService: UserproductService,
    private readonly productService: ProductService,
    private readonly adminService: AdminService,
  ) {}

  @Get('products')
  async getProduct(@Headers('Authorization') authHeader: string): Promise<Product[]> {
    const token = this.extractTokenFromHeader(authHeader);
    const isValidToken = await this.adminService.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Access denied. Invalid token.');
    }
    return this.productService.findAll();
  }


  @Delete(':id')
  async deleteProduct(
    @Param('id') id: number,
    @Headers('Authorization') authHeader: string,
  ): Promise<{ message: string }> {
    const token = this.extractTokenFromHeader(authHeader);
    const isValidToken = await this.adminService.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Access denied. Invalid token.');
    }
    await this.productService.Delete(id);
    return { message: 'Success Delete UserProduct' };
  }

  private extractTokenFromHeader(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing authorization header');
    }
    return authHeader.split(' ')[1];
  }
}
