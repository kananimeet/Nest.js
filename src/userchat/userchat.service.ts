  import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
  import { UserService } from 'src/user/user.service';
  import { User } from 'src/user/user.entity'; 
  import { ProductService } from 'src/product/product.service';
import { ChatData } from './userchat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

  @Injectable()
  export class UserchatService {
    constructor(
      private readonly userService: UserService,
      private readonly productService: ProductService,
      @InjectRepository(ChatData) private readonly chatDataRepository: Repository<ChatData>,
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



    async saveChatData(token: string, productName: string, message: string): Promise<ChatData> {
      const userInfo = await this.getUserInfo(token);
      const productDetails = await this.getProductDetails(productName, message);
      
      // Ensure productImage is passed correctly as an array of strings
      const chatData: ChatData = this.chatDataRepository.create({
        firstname: userInfo.firstname,
        imageUpload: userInfo.imageUpload,
        address: userInfo.address,
        productName: productDetails.productName,
        productImage: Array.isArray(productDetails.productImage) ? productDetails.productImage : [productDetails.productImage], // Ensure it's an array
        message: productDetails.message,
      });
    
      return await this.chatDataRepository.save(chatData);
    }


  }



