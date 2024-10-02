import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { promises as fs } from 'fs';


@Injectable()
export class ProductService {
constructor(@InjectRepository(Product) private readonly addProduct: Repository<Product>,) {}

    async create(
        productName: string,
        price: number,
        description: string,
        imageFiles: Express.Multer.File[], 
    ): Promise<Product> {

        this.validateImageUpload(imageFiles);

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
    
}
