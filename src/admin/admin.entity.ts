import { Column,PrimaryGeneratedColumn,Entity} from "typeorm";
@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:100})
    AdminName:string;

    @Column({length:100})
    Email:string;

    @Column({length:100})
    Password:string;
}