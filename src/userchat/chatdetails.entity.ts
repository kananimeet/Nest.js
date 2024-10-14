import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_details') 
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  firstname: string;

  @Column()
  imageUpload: string;

  @Column()
  address: string;

  @Column()
  productName: string;

  @Column('text', { array: true })
  productImage: string[];

  @Column()
  message: string;

  
}
