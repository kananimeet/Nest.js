
import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:100})
    productName:string;

    @Column()
    price:number;

    @Column({length:100})
    description:string;

    @Column({ type: 'text', nullable: true })
    imagePaths: string;
}