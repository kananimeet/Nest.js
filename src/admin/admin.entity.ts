import { IsNotEmpty, IsString } from "class-validator";
import { Column,PrimaryGeneratedColumn,Entity} from "typeorm";
@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id:number;
    @IsNotEmpty()
    @IsString()
    @Column({length:100})
    adminname:string;

    @Column({unique:true})
    email:string;

    @IsNotEmpty()
    @Column({length:100})
    password:string;
}