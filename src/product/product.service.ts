import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { promises as fs } from 'fs';
import { Like } from 'typeorm';


@Injectable()
export class ProductService {
constructor(@InjectRepository(Product) private readonly addProduct: Repository<Product>,) {}

    async create(
        productName: string,
        price: number,
        description: string,
        imageFiles: Express.Multer.File[], 
    ): Promise<Product> {

        try {
            const imagePaths = await this.handleFileUpload(imageFiles);
            const product = this.addProduct.create({ productName, price, description, imagePaths });
            return this.addProduct.save(product);
        } catch (error) {
            throw new HttpException("Not Saved",500);
        }
    }


    private validateImageUpload(files: Express.Multer.File[]): void {   
        const requiredImages = 6;
        const maxSizeInBytes = 10 * 1024 * 1024; 
        
        if (files.length !== requiredImages) {
            throw new HttpException("You must upload exactly 6 images", 500);
        }
    }

    private async handleFileUpload(files: Express.Multer.File[]): Promise<string> {
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
    
        return filePaths.join(','); 
    }
    

    async findByName(productName: string): Promise<Product[]> {
        try {
            const products = await this.addProduct.find({
                where: { productName: Like(`%${productName}%`) },
            });
            if (products.length === 0) {
                throw new HttpException("Product not found", 404);
            }
            return products;
        } catch (error) {
            throw new HttpException("An error occurred while searching for products",500);
        }
    }


    async update(
        id: number,
        productName?: string,
        price?: number,
        description?: string,
        imageFiles?: Express.Multer.File[]
    ): Promise<Product> {

        const product = await this.addProduct.findOne({ where: { id } });

        if (!product) {
            throw new HttpException("Product not found", 404);
        }

        if (productName) product.productName = productName;
        if (price !== undefined) product.price = price;
        if (description) product.description = description;

        if (imageFiles && imageFiles.length > 0) {
            this.validateImageUpload(imageFiles);
            const newImagePaths = await this.handleFileUpload(imageFiles);

            product.imagePaths = newImagePaths;
        }

        try {
            return this.addProduct.save(product);
        } catch (error) {
            throw new HttpException("Product not updated", 500);
        }
    }


    async deleteById(id:number):Promise<Product>{
        try{
        await this.addProduct.delete(id);
        return
    
        }catch{
            throw new HttpException("Not Delete Product",500);
        }

    }




    
    

}
