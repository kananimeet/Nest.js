import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AllproductService } from './allproduct.service'; 
import { Product } from 'src/product/product.entity'; 

@Controller('all-products')
export class AllproductController {
  constructor(private readonly allProductService: AllproductService) {}

  @Get() 
  async getAllProducts(): Promise<Pick<Product, 'productName' | 'address' | 'price' | 'imagePaths'>[]> {
    try {
      return await this.allProductService.getAllProducts();
    } catch (error) {
      throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

