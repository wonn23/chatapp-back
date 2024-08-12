import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 20 })
  type: string;

  @Column()
  title: string;

  @Column()
  place: string;

  @Column()
  meetingTime: Date;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  totalM: number;

  @Column()
  totalF: number;

  @Column({ default: 0 })
  recruitedM: number;

  @Column({ default: 0 })
  recruitedF: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
