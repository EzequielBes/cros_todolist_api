import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm";
import { AccountEntity } from "./account.entity";
import {SubTaskEntity} from './subtask.entity'
@Entity("main_task")
export class MainTaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  tag: string;

  @Column({ type: 'bytea' })
  document: Buffer;

  @Column({ default: false })
  status: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => AccountEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: AccountEntity;
}
