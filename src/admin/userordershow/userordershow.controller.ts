import { Controller, Delete, Get, Headers, HttpException, HttpStatus, Param } from '@nestjs/common';
import { UserordershowService } from './userordershow.service';
import { Order } from 'src/productorder/order.entity';

@Controller('userorders') 
export class UserordershowController {
    constructor(private readonly userOrderShowService: UserordershowService) {}

    @Get()
    async getUserOrders(@Headers('Authorization') adminToken: string): Promise<Order[]> {

        if (!adminToken) {
            throw new HttpException('Token is required', HttpStatus.UNAUTHORIZED);
        }

        const token = adminToken.startsWith('Bearer ') ? adminToken.split(' ')[1] : adminToken;
        return this.userOrderShowService.showUserOrders(token);
    }



    @Delete(':id') 
    async deleteUserOrder(@Headers('Authorization') adminToken: string, @Param('id') orderId: number): Promise<void> {
        if (!adminToken) {
            throw new HttpException('Token is required', HttpStatus.UNAUTHORIZED);
        }

        const token = adminToken.startsWith('Bearer ') ? adminToken.split(' ')[1] : adminToken;

        await this.userOrderShowService.deleteUserOrder(token, orderId);
    }



}

