import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductorderService } from 'src/productorder/productorder.service';
import { AdminService } from 'src/admin/admin.service';
import { Order } from 'src/productorder/order.entity';

@Injectable()
export class UserordershowService {
    constructor(
        private readonly productOrderService: ProductorderService,
        private readonly adminService: AdminService,
    ) {}

    async showUserOrders(adminToken: string): Promise<Order[]> {
        try {
            const isValidToken = await this.adminService.validateToken(adminToken);
            if (!isValidToken) {
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
            }

            const userOrders = await this.productOrderService.getUserOrder();
            return userOrders;
        } catch (error) {
            console.error('Error showing user orders:', error);
            throw new HttpException("Could not display user orders", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async deleteUserOrder(adminToken: string, orderId: number): Promise<void> {
        try {
            const isValidToken = await this.adminService.validateToken(adminToken);
            if (!isValidToken) {
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
    
            await this.productOrderService.deleteOrderById(orderId);
        } catch (error) {
            console.error('Error deleting user order:', error);
            throw new HttpException("Could not delete user order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    


}
