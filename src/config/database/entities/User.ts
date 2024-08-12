import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { EnumType } from 'typescript';
import { Region } from './enum/region.enum';
import { MBTI } from './enum/mbti.enum';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 20 })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type: 'boolean', default: false })
  birthday: Date;

  @Column()
  age: number;

  @Column()
  job: string;

  @Column({ type: 'enum', enum: Region })
  region: EnumType;

  @Column({ type: 'enum', enum: MBTI })
  mbti: EnumType;

  @Column()
  height: number;

  @Column({ nullable: true, type: 'text', default: '' })
  introduce: string;
}
