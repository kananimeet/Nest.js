import { Controller, Post, Body, Param, Headers, Get } from '@nestjs/common';
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
    ): Promise<{ message: string; details: any }> {
        const details = await this.productOrderService.getProductDetailsById(
            productId,
            userToken.replace('Bearer ', ''), 
            orderDto.quantity,
            orderDto.address,
        );
        return { message: "Order placed successfully", details };
    }

    @Get()
    async getUserOrders(@Headers('Authorization') userToken: string): Promise<{ message: string; orders: any[] }> {
        const orders = await this.productOrderService.getUserOrders(userToken.replace('Bearer ', ''));
        return { message: "User orders retrieved successfully", orders };
    }
}
