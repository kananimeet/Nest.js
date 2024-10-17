import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class QuantityDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNotEmpty()
    address: string;
}
