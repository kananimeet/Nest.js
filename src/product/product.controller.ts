import { ProductService } from './product.service';
import { UseraccountService } from 'src/useraccount/useraccount.service';
import { Product } from './product.entity';
import { Body, Get, Put, Query, Param, Delete, Controller, Post, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IsString, IsNotEmpty, MaxLength, validateSync } from 'class-validator';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly userAccountService: UseraccountService 
    ) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images', 6))
    async createProduct(
        @Body('productName') productName: string,
        @Body('price') price: number,
        @Body('description') description: string,
        @UploadedFiles() files: Express.Multer.File[],
        @Body('userEmail') userEmail: string 
    ) {
        const validationErrors = this.validateProductInput(productName, price, description);

        if (validationErrors.length > 0) {
            throw new BadRequestException(validationErrors);
        }

      
        const userAccount = await this.userAccountService.findByEmail(userEmail);
        if (!userAccount) {
            throw new BadRequestException("User account not found");
        }

        const { profile } = userAccount;
        const userAddress = profile.address; 
        const imageUpload = profile.imageUpload; 

        
        return this.productService.create(productName, price, description, files, userAddress, imageUpload);
    }

    private validateProductInput(productName: string, price: number, description: string) {
        class ProductInput {
            @IsString()
            @IsNotEmpty()
            @MaxLength(50, { message: 'Product name is too long. Max length is 50 characters.' })
            productName: string;

            @IsNotEmpty()
            price: number;

            @IsString()
            @IsNotEmpty()
            @MaxLength(500, { message: 'Max length is 500 characters.' })
            description: string;
        }

        const productInput = new ProductInput();
        productInput.productName = productName;
        productInput.price = price;
        productInput.description = description;

        
        const errors = validateSync(productInput);
        return errors.map(error => Object.values(error.constraints || {})).flat();
    }


    @Get('search')
    async search(@Query('productName') name: string): Promise<Product[]> {
        return this.productService.findByName(name);
    }

        
    @Put(':id')
    @UseInterceptors(FilesInterceptor('images', 6))
    async updateProduct(
        @Param('id') id: number,
        @Body('productName') productName?: string,
        @Body('price') price?: number,
        @Body('description') description?: string,
        @UploadedFiles() imageFiles?: Express.Multer.File[]
    ): Promise<Product> {
        return this.productService.update(id, productName, price, description, imageFiles);
    }


    @Delete(':id')
    async delete(@Param('id')id:number) {
        const dataDelete = await this.productService.deleteById(id);
        return {message:"product deleted successfully"}
    }
}
