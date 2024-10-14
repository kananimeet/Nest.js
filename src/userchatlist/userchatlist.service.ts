import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetail } from 'src/userchat/chatdetails.entity'; 

@Injectable()
export class UserchatlistService {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
  ) {}

  async saveProductDetails(productDetails: { productName: string; productImage: string[]; message: string }): Promise<void> {
    const productDetail = this.productDetailRepository.create(productDetails);
    await this.productDetailRepository.save(productDetail); 
    console.log("Product Details Saved:", productDetail);
  }
}
