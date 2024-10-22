import { Controller, Post, Get, Body, Request, UseGuards, Delete, Param,Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AddtocartService } from './addtocart.service';
import { Addtocart } from './addtocart.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
export class AddtocartController {
    constructor(private readonly addtocartService: AddtocartService) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addToCart(@Body('productId') productId: number, @Request() req): Promise<{ message: string }> {
        const userToken = req.headers.authorization.split(' ')[1]; 
        await this.addtocartService.addToCart(productId, userToken);
        return { message: "Product successfully added to cart." };
    }

  
    @UseGuards(JwtAuthGuard)
    @Get('items')
    async getAllCartItems(@Request() req): Promise<Addtocart[]> {
        const userToken = req.headers.authorization.split(' ')[1]; 
        return this.addtocartService.getAllCartItems(userToken);
    }

    @Delete(':id')
    async deleteCartItem(@Param('id') cartItemId: number, @Headers('Authorization') authHeader: string): Promise<{ message: string }> {
        const userToken = authHeader.split(' ')[1];
        await this.addtocartService.deleteCartItem(cartItemId, userToken);
        return { message: "Cart item successfully deleted." };
    }
}
