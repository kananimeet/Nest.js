import { Controller, Get, Post, Param, Headers, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserchatService } from './userchat.service';

@Controller('chat')
export class UserchatController {
    constructor(private readonly userchatService: UserchatService) {}

    @Get('user-info')
    async getUserInfo(@Headers('authorization') authorization: string): Promise<{ firstname: string; imageUpload: string; address: string; }> {
        const token = authorization?.replace('Bearer ', '');
        if (!token) {
            throw new HttpException('Authorization token is required', HttpStatus.UNAUTHORIZED);
        }
        return this.userchatService.getUserInfo(token);
    }

    @Post('product-info/:productName')
    async getProductInfo(
        @Param('productName') productName: string,
        @Headers('authorization') authorization: string,
        @Body('message') message: string 
    ): Promise<{ firstname: string; imageUpload: string; address: string; productName: string; productImage: string[]; message: string }> {
        const token = authorization?.replace('Bearer ', '');
        if (!token) {
            throw new HttpException('Authorization token is required', HttpStatus.UNAUTHORIZED);
        }

        const userInfo = await this.userchatService.getUserInfo(token);
        const productDetails = await this.userchatService.getProductDetails(productName, message);
        return {
            firstname: userInfo.firstname,
            imageUpload: userInfo.imageUpload,
            address: userInfo.address,
            productName: productDetails.productName,
            productImage: productDetails.productImage,
            message: productDetails.message,
        };
    }
}

