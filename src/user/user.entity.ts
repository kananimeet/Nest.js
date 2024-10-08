import { IsEmail, isEmail, IsNotEmpty, IsString,Length } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, } from "typeorm";
import { Product } from "src/product/product.entity";

@Entity()
export class User {
   
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    firstname: string;
    
    @Column({ length: 100 })
    lastname: string;

    @Column({ length: 100 })
    nickname: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 100 })
    confirmpassword: string;
  
    @Column({ nullable: true })
    imageUpload: string;
  
    @Column({ nullable: true })
    address: string; 


    // @OneToMany(() => Product, product => product.user) // Associate User with Product
    // products: Product[]; 


   
}

