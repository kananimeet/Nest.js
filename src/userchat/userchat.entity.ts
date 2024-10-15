import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  imageUpload: string;

  @Column()
  address: string;

  @Column()
  productName: string;

  @Column('json')  
  productImage: string[];

  @Column()
  message: string;

  @Column({ nullable: true }) 
  replay: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}



