import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApprovalStatus } from './enum/ApprovalStatus';

@Entity('participants')
export class Participant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @Column()
  canceled: boolean;

  @Column({ type: 'enum', enum: ApprovalStatus })
  status: ApprovalStatus;

  @Column()
  matchingCount: number;
}
