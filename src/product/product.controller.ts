import { Controller, Post, Body, UseInterceptors, UploadedFiles,Get,Query,Delete, Param, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Product } from './product.entity';


@Controller('products')
    export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images', 6,))
    async createProduct(
        @Body('productName') productName: string,
        @Body('price') price: number,
        @Body('description') description: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.productService.create(productName, price, description, files);
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

