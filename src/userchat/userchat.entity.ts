import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatData {
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

  @Column('text', { array: true })
  productImage: string[]; 

  @Column()
  message: string; // Ensure this property exists
}
