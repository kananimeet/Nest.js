import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserchatlistService } from 'src/userchatlist/userchatlist.service'; 
import { ProductChat } from 'src/userchat/userchat.entity';
import { AdminService } from 'src/admin/admin.service'; 
import { Repository } from 'typeorm'; 
import { InjectRepository } from '@nestjs/typeorm'; 

@Injectable()
export class ProductchatlistService {
  constructor(
    private readonly userchatlistService: UserchatlistService,
    private readonly adminService: AdminService,
    @InjectRepository(ProductChat)
    private readonly productChatRepository: Repository<ProductChat>,
  ) {}

  async getAllProductDetails(token: string): Promise<ProductChat[]> {
    const isValidToken = await this.adminService.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid token');
    }
    return this.userchatlistService.getAllProductDetails(); 
  } 


  async replyToProductChat(token: string, chatId: number, replay: string): Promise<ProductChat> {
    const isValidToken = await this.adminService.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid token');
    }
  
    const productChat = await this.productChatRepository.findOne({ where: { id: chatId } });
    if (!productChat) {
      throw new Error('Chat not found');
    }
  
    productChat.replay = replay;
    return await this.productChatRepository.save(productChat);
  }


  async deleteProductChat(token: string, chatId: number): Promise<void> {
    const isValidToken = await this.adminService.validateToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const productChat = await this.productChatRepository.findOne({ where: { id: chatId } });
    if (!productChat) {
      throw new NotFoundException('Chat not found');
    }

    await this.productChatRepository.remove(productChat);
  }
}
