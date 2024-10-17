import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders') // Name of the database table
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column('decimal')
    price: number;

    @Column()
    description: string;

    @Column()
    firstname: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    payment: string;

    @Column()
    quantity: number; // Add quantity to the order

    @Column()
    total: number; 
}
