import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_chat')  // Table name in the database
export class UserChat {
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

  @Column('json')  // Assuming images can be stored as an array or object
  productImage: string[];

  @Column()
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
