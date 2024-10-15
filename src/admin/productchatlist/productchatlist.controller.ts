import { Controller, Get, Post, Body, Headers, Param, UnauthorizedException, Delete, HttpException } from '@nestjs/common';
import { ProductchatlistService } from './productchatlist.service';
import { ProductChat } from 'src/userchat/userchat.entity';

@Controller('chatlists')  
export class ProductchatlistController {
  constructor(private readonly productchatlistService: ProductchatlistService) {}

  @Get()
  async getProductChatList(@Headers('Authorization') authHeader: string): Promise<ProductChat[]> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is missing or invalid');
    }
    const token = authHeader.split(' ')[1];
    return this.productchatlistService.getAllProductDetails(token);
  }


  @Post(':id/replay')
  async replyToChat(
    @Headers('Authorization') authHeader: string,
    @Param('id') id: number,
    @Body('replay') replay: string
  ): Promise<ProductChat> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is missing or invalid');
    }
    const token = authHeader.split(' ')[1];
    return this.productchatlistService.replyToProductChat(token, id, replay);
  }



  @Delete(':id')
  async deleteChat(
    @Headers('Authorization') authHeader: string,
    @Param('id') id: number
  ): Promise<void> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is missing or invalid');
    }
    const token = authHeader.split(' ')[1];
    return this.productchatlistService.deleteProductChat(token, id);
  
  }



}
