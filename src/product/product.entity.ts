import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column('decimal')
    price: number;

    @Column()
    description: string;

    @Column('simple-array')
    imagePaths: string[];

    @Column()
    address: string;

    @Column()
    imageUpload: string;

    @Column()
    firstname: string; 

    @Column('int')
    quantity: number;
    
}
