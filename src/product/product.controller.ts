import { Controller, Post, Put, Body, Param,Request, UseGuards, UseInterceptors, UploadedFiles, Query, Get, Delete, HttpException, HttpStatus,Headers, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { ProductService } from './product.service';
import { UseraccountService } from 'src/useraccount/useraccount.service';
import { Product } from './product.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IsNotEmpty, IsString, MaxLength, validateSync } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';


@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userAccountService: UseraccountService,
  ) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 6)) 
  async createProduct(
      @Body('productName') productName: string,
      @Body('price') price: number,
      @Body('description') description: string,
      @UploadedFiles() files: Express.Multer.File[],
      @Request() req: any
  ) {
      const token = req.headers.authorization.split(' ')[1];
      return this.productService.create(productName, price, description, files, token);
  }


  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Product[]> {
      return this.productService.findAll();
  }


  @Get('search')
  @UseGuards(JwtAuthGuard)
  async search(@Query('productName') name: string): Promise<Product[]> {
      return this.productService.findByName(name);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 6))
  async updateProduct(
      @Param('id') id: number,
      @Request() req: any, 
      @Body('productName') productName?: string,
      @Body('price') price?: number,
      @Body('description') description?: string,
      @UploadedFiles() imageFiles?: Express.Multer.File[],
     
  ) {
      const token = req.headers.authorization.split(' ')[1];
      return this.productService.update(id,token, productName, price, description, imageFiles);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number) {
      await this.productService.deleteById(id);
      return { message: "Product deleted successfully" };
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
}







