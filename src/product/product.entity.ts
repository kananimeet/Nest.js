
// import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Product{

//     @PrimaryGeneratedColumn()
//     id:number;

//     @Column({length:100})
//     productName:string;

//     @Column()
//     price:number;

//     @Column({length:100})
//     description:string;

//     @Column({ type: 'text', nullable: true })
//     imagePaths: string;
// }



// // import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// // import { User } from 'src/user/user.entity'; // Adjust the path according to your project structure

// // @Entity()
// // export class Product {
// //     @PrimaryGeneratedColumn()
// //     id: number;

// //     @Column()
// //     productName: string;

// //     @Column()
// //     price: number;

// //     @Column()
// //     description: string;

// //     @Column('text', { array: true }) // Assuming imagePaths is an array of strings
// //     imagePaths: string[];

// //     @Column({ nullable: true }) // Optional field for imageUpload
// //     imageUpload: string;

// //     @Column({ nullable: true }) // Optional field for address
// //     address: string;

// //     @ManyToOne(() => User, user => user.products) // Assuming User entity has a products relation
// //     user: User; // Relation to User
// // }


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

    @Column({ type: 'text', array: true }) // Use text array if you want to store multiple image paths
    imagePaths: string[];

    @Column({ nullable: true }) // Mark as nullable if not every product will have an address
    address: string;

    @Column({ nullable: true }) // Mark as nullable if not every product will have an image upload reference
    imageUpload: string;
}
