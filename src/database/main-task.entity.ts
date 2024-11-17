import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn
} from "typeorm";
import { AccountEntity } from "./account.entity";
import { SubTaskEntity } from "./subtask.entity";
@Entity("main_task")
export class MainTaskEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  owner_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  tag: string;

  @Column({ type: "bytea", nullable: true })
  document: Buffer;

  @Column({ default: false })
  status: boolean;

  @Column()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => AccountEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "owner_id", referencedColumnName: "id" })
  owner: AccountEntity;

  @OneToMany(() => SubTaskEntity, (subtask) => subtask.mainTask, {
    cascade: true,
  })
  subtasks: SubTaskEntity[];
}
