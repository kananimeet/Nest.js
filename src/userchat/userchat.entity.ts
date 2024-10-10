import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('userchat')
export class UserChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string; // User's first name

  @Column()
  imageUpload: string; // User's uploaded image path

  @Column()
  address: string; // User's address

  @Column('text')
  message: string; // Chat message

  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the chat was created

  @CreateDateColumn()
  updatedAt: Date; // Timestamp of when the chat was last updated
}
