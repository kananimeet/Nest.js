import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { UserChat } from './userchat.entity';
import { UserchatlistService } from 'src/userchatlist/userchatlist.service';

@Injectable()
export class UserchatService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly userchatListService: UserchatlistService,
  ) {}

  async getUserInfo(token: string): Promise<{ firstname: string; imageUpload: string; address: string }> {
    const user = await this.userService.getUserFromToken(token);
    return {
      firstname: user.firstname,
      imageUpload: user.imageUpload,
      address: user.address,
    };
  }

  async getProductDetails(productName: string, message: string): Promise<{ productName: string; productImage: string[]; message: string }> {
    const products = await this.productService.findByName(productName);

    if (!products || products.length === 0) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }

    const product = products[0];

    const productDetails = {
      
      productName: product.productName,
      productImage: product.imagePaths,
      message: message,
    };

  
    await this.userchatListService.saveProductDetails(productDetails);

    return productDetails;
  }
}
