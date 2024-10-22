import { Injectable, HttpException, HttpStatus,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { promises as fs } from 'fs';
import { Like } from 'typeorm';
import { UseraccountService } from 'src/useraccount/useraccount.service'; 

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly addProduct: Repository<Product>,
        private readonly userAccountService: UseraccountService,
        ) {}

       async create(
        productName: string,
        price: number,
        description: string,
        imageFiles: Express.Multer.File[],
        userToken: string,
        quantity: number 
    ): Promise<{ message: string }> {
        try {
            const userProfile = await this.userAccountService.getUserFromToken(userToken);
            const userAddress = userProfile.address;
            const imageUpload = userProfile.imageUpload;
            const imagePaths = await this.handleFileUpload(imageFiles);
            const firstname = userProfile.firstname;
            const product = this.addProduct.create({ 
                productName, 
                price, 
                description, 
                imagePaths,
                address: userAddress, 
                imageUpload,
                quantity,
                firstname
                
            });
            await this.addProduct.save(product);
            return {
                message: "Product added successfully"
            };
        } catch (error) {
            throw new HttpException("Not Saved", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private validateImageUpload(files: Express.Multer.File[]): void {   
        const requiredImages = 6;
        const maxSizeInBytes = 10 * 1024 * 1024; 
        
        if (files.length !== requiredImages) {
            throw new HttpException("You must upload exactly 6 images", HttpStatus.BAD_REQUEST);
        }

    }


    private async handleFileUpload(files: Express.Multer.File[]): Promise<string[]> { 
        const uploadPath = 'uploads/products/';
        await fs.mkdir(uploadPath, { recursive: true });
        const filePaths = await Promise.all(
            files.map(async (file) => {
                const originalFileName = file.originalname;
                const uniqueFileName = `${originalFileName}`;
                const filePath = `${uploadPath}${uniqueFileName}`;
                await fs.writeFile(filePath, file.buffer);
                return filePath;
            })
        );
      return filePaths; 
    }
    

    async findByName(productName: string): Promise<Product[]> {
        try {
            const products = await this.addProduct.find({
                where: { productName: Like(`%${productName}%`) },
            });
            if (products.length === 0) {
                throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
            }
            return products;
        } catch (error) {
            throw new HttpException("An error occurred while searching for products", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    async update(
        id: number,
        userToken: string,
        updateData: any,
        imageFiles?: Express.Multer.File[]
    ): Promise<void> {
        if (!userToken) {
            throw new UnauthorizedException("User token is required");
        }
        const product = await this.addProduct.findOne({ where: { id } });
        if (!product) {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
    
        const userProfile = await this.userAccountService.getUserFromToken(userToken);
        product.address = userProfile.address;
        product.imageUpload = userProfile.imageUpload;
    
        Object.assign(product, updateData);
    
        if (imageFiles && imageFiles.length > 0) {
            this.validateImageUpload(imageFiles);
            const newImagePaths = await this.handleFileUpload(imageFiles);
            product.imagePaths = newImagePaths;
        }
        
        try {
            await this.addProduct.save(product);
         }  catch (error) {
            console.error('Error during product update:', error);
            throw new HttpException("Product not updated", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async deleteById(id:number):Promise<Product> {
        try {
            await this.addProduct.delete(id);
            return null;
           }catch (error) {
            throw new HttpException("Not Delete Product", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllByUser(userToken: string): Promise<Product[]> {
        try {
            const userProfile = await this.userAccountService.getUserFromToken(userToken);
            const products = await this.addProduct.find({
            where: { address: userProfile.address },
            });
            return products;
        }   catch (error) {
            console.error('Error fetching user products:', error);
            throw new HttpException("An error occurred while fetching user's products", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Admin side fetched product
    async findAll():Promise<Product[]> {
        return this.addProduct.find();
    }

    async Delete(id: number): Promise<void> {
        await this.addProduct.delete(id);
    }    
    
    
    async findById(id: number): Promise<Product> {
        const product = await this.addProduct.findOne({ where: { id } });
    
        if (!product) {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
     return product;
    }
    

    async updateProductQuantity(productId: number, quantity: number): Promise<void> {
        const product = await this.addProduct.findOne({ where: { id: productId } });

        if (!product) {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
        product.quantity = quantity; 
        await this.addProduct.save(product);
    }
}