import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';

@Injectable()
export class AllproductService {
  constructor(private readonly productService: ProductService) {}

  async getAllProducts(): Promise<Pick<Product, 'productName' | 'address' | 'price' | 'imagePaths'>[]> {
    const products = await this.productService.findAll();
    return products.map(({ productName, address, price, imagePaths }) => ({
      
      productName,
      address,
      price,
      imagePaths: imagePaths.length > 0 ? [imagePaths[0]] : [], 
    }));
  }
}
