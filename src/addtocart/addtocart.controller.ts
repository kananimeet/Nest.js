import { Controller, Post, Get, Body, Request, UseGuards, Delete, Param,Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AddtocartService } from './addtocart.service';
import { Addtocart } from './addtocart.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
export class AddtocartController {
    constructor(private readonly addtocartService: AddtocartService) {}

    
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addToCart(@Body('productId') productId: number, @Request() req): Promise<string> {
        const userToken = req.headers.authorization.split(' ')[1]; 
        return this.addtocartService.addToCart(productId, userToken);
    }

   
    @UseGuards(JwtAuthGuard)
    @Get('items')
    async getAllCartItems(@Request() req): Promise<Addtocart[]> {
        const userToken = req.headers.authorization.split(' ')[1]; 
        return this.addtocartService.getAllCartItems(userToken);
    }
 
    @Delete(':id')
    async deleteCartItem(@Param('id') cartItemId: number, @Headers('Authorization') userToken: string): Promise<string> {
        return await this.addtocartService.deleteCartItem(cartItemId, userToken);
    }

}