import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UseraccountService } from 'src/useraccount/useraccount.service'; 
import { Product } from 'src/product/product.entity';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductorderService {
    constructor(
        private readonly productService: ProductService,
        private readonly userAccountService: UseraccountService,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async getProductDetailsById(
        productId: number, 
        userToken: string, 
        quantity: number, 
        address: string
    ): Promise<{
        productName: string;
        price: number;
        description: string;
        firstname: string; 
        email: string;       
        address: string;
        payment: string;
        total: number; 
    }> {
        try {
            const userProfile = await this.userAccountService.getUserFromToken(userToken);
            if (!userProfile) {
                throw new HttpException("Invalid user token", HttpStatus.UNAUTHORIZED);
            }

            const product: Product = await this.productService.findById(productId);
            if (quantity > product.quantity) {
                throw new HttpException("This product is not in stock", HttpStatus.NOT_FOUND);
            }

            const total = product.price * quantity;

            product.quantity -= quantity;
            await this.productService.updateProductQuantity(productId, product.quantity);

            const order = this.orderRepository.create({
                productName: product.productName,
                price: product.price,
                description: product.description,
                firstname: userProfile.firstname, 
                email: userProfile.email,
                address,           
                payment: "Cash on Delivery",
                quantity,
                total,
            });

            await this.orderRepository.save(order);

            return {
                productName: product.productName,
                price: product.price,
                description: product.description,
                firstname: userProfile.firstname, 
                email: userProfile.email,   
                address,        
                payment: "Cash on Delivery",
                total, 
            };
        } catch (error) {
            console.error('Error fetching product details:', error);
            throw new HttpException("Product details could not be retrieved", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  
    async getUserOrders(userToken: string): Promise<Order[]> {
        try {
            const userProfile = await this.userAccountService.getUserFromToken(userToken);
            if (!userProfile) {
                throw new HttpException("Invalid user token",404);
            }
            const userOrders = await this.orderRepository.find({
                where: { email: userProfile.email },
            });
            return userOrders;
        } catch (error) {
            console.error('Error fetching user orders:', error);
            throw new HttpException("Could not retrieve user orders", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



//fetch admin side order data
    async getUserOrder(): Promise<Order[]> {
        try {
            // Fetch all orders since this is accessed by admin
            const userOrders = await this.orderRepository.find();
            return userOrders;
        } catch (error) {
            console.error('Error fetching user orders:', error);
            throw new HttpException("Could not retrieve user orders", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    async deleteOrderById(orderId: number): Promise<void> {
        const result = await this.orderRepository.delete(orderId);
        if (result.affected === 0) {
            throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
        }
    }



    



}
