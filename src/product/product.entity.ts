// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class Product {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     productName: string;

//     @Column()
//     price: number;

//     @Column()
//     description: string;

//     @Column({ type: 'text', array: true }) 
//     imagePaths: string[];

//     @Column({ nullable: true }) 
//     address: string;

//     @Column({ nullable: true }) 
//     imageUpload: string;
  
// }






import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column('int')
    quantity: number; 
}
