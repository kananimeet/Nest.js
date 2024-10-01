import { IsEmail, isEmail, IsNotEmpty, IsString,Length } from "class-validator";
import { PrimaryGeneratedColumn, Column, Entity, } from "typeorm";

@Entity()
export class User {
   
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    Firstname: string;
    
    @Column({ length: 100 })
    Last_name: string;

    
    @Column({ length: 100 })
    Nickname: string;

    @Column({ unique: true })
     Email: string;

    @Column({ length: 100 })
    Password: string;

    @Column({ length: 100 })
    Conf_Password: string;
  
}

