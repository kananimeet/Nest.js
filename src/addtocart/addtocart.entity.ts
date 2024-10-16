import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Addtocart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    productName: string;

    @Column()
    price: number;

    @Column("text", { array: true })
    imagePaths: string[];

    @Column()
    userId: number;
}
