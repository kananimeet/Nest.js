import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductChat } from 'src/userchat/userchat.entity';

@Injectable()
export class UserchatlistService {
  constructor(
    @InjectRepository(ProductChat)
    private readonly productDetailRepository: Repository<ProductChat>,
   
  ) {}

  async saveProductDetails(productDetails: {
    firstname: string;
    imageUpload: string;
    address: string;
    productName: string;
    productImage: string[];
    message: string;
    
    
  }): Promise<void> {
    const productDetail = this.productDetailRepository.create(productDetails);
    await this.productDetailRepository.save(productDetail);
    // console.log("Product Details Saved:", productDetail);
  }

  
  async getAllProductDetails(): Promise<ProductChat[]> {
    const productDetails = await this.productDetailRepository.find();
    return productDetails;
  }
}
