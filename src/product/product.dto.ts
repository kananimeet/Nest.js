import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsArray()
    images: string[]; // Array of image URLs or paths
}
