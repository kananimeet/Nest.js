  import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
  import { UserService } from 'src/user/user.service';
  import { User } from 'src/user/user.entity'; 
  import { ProductService } from 'src/product/product.service';

  @Injectable()
  export class UserchatService {
    constructor(
      private readonly userService: UserService,
      private readonly productService: ProductService
    ) {}

    async getUserInfo(token: string): Promise<{ firstname: string; imageUpload: string; address: string; }> {
      const user: User = await this.userService.getUserFromToken(token);
      
      return {
        firstname: user.firstname,
        imageUpload: user.imageUpload,
        address: user.address,
      };
    } 

    async getProductDetails(
      productName: string,
      message: string
    ): Promise<{ productName: string; productImage: string[]; message: string }> {
      const products = await this.productService.findByName(productName);
      
      if (!products || products.length === 0) {
        throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
      }

      const product = products[0];

      return {
        productName: product.productName,
        productImage: product.imagePaths,
        message: message,
      };
    }
  }
