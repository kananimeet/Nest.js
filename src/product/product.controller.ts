import { Controller, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './product.dto';


@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images', 6)) // 'images' is the field name in the form
    async createProduct(
        @Body('productName') productName: string,
        @Body('price') price: number,
        @Body('description') description: string,
        @UploadedFiles() files: Express.Multer.File[], // Get uploaded files
    ) {
        return this.productService.create(productName, price, description, files);
    }
}

