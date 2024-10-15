import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column({ type: 'text', array: true }) 
    imagePaths: string[];

    @Column({ nullable: true }) 
    address: string;

    @Column({ nullable: true }) 
    imageUpload: string;
  
}
