import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addtocart } from './addtocart.entity';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddtocartService {
    constructor(
        @InjectRepository(Addtocart) private readonly cartItemRepository: Repository<Addtocart>,
        private readonly productService: ProductService,
        private readonly userService: UserService,
    ) {}

    async addToCart(productId: number, userToken: string): Promise<void> {
        try {
            const product = await this.productService.findById(productId);
            const user = await this.userService.getUserFromToken(userToken); 

            if (!product) {
                throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
            }
                const cartItem = this.cartItemRepository.create({
                productId: product.id,
                productName: product.productName,
                price: product.price,
                imagePaths: product.imagePaths,
                userId: user.id
            });

            await this.cartItemRepository.save(cartItem);
        } catch (error) {
            throw new HttpException("Could not add product to cart", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllCartItems(userToken: string): Promise<Addtocart[]> {
        try {
            const user = await this.userService.getUserFromToken(userToken);

            const cartItems = await this.cartItemRepository.find({ where: { userId: user.id }});

            if (!cartItems.length) {
                throw new HttpException("No items found in cart", HttpStatus.NOT_FOUND);
            }

            return cartItems;
           }catch (error) {
            throw new HttpException("Could not retrieve cart items", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteCartItem(cartItemId: number, userToken: string): Promise<void> {
        try {
            const user = await this.userService.getUserFromToken(userToken);
            const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId, userId: user.id } });

            if (!cartItem) {
                throw new HttpException("Cart item not found", HttpStatus.NOT_FOUND);
            }
            await this.cartItemRepository.delete(cartItemId);
           }catch (error) {
            throw new HttpException("Could not delete cart item", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}