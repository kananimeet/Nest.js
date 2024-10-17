import { Controller, Post, Body, Param,Headers, Get } from '@nestjs/common';
import { ProductorderService } from './productorder.service';
import { QuantityDto } from './productorder.dto';

@Controller('product-orders')
export class ProductorderController {
    constructor(private readonly productOrderService: ProductorderService) {}

    @Post(':productId')
    async getProductDetails(
        @Param('productId') productId: number,
        @Body() orderDto: QuantityDto,
        @Headers('Authorization') userToken: string,
    ) {
        return await this.productOrderService.getProductDetailsById(
            productId,
            userToken.replace('Bearer ', ''), 
            orderDto.quantity,
            orderDto.address, 
        );
    }


    @Get()
    async getUserOrders(@Headers('Authorization') userToken: string) {
        return await this.productOrderService.getUserOrders(userToken.replace('Bearer ', ''));
    }
}
