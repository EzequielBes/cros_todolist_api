import { MainTaskEntity } from "./main-task.entity";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("subtasks")
export class SubTaskEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  owner_task_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  tag: string;

  @Column({ type: "bytea", nullable: true })
  document: Buffer;

  @Column()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => MainTaskEntity, (mainTask) => mainTask.subtasks, {
    onDelete: "CASCADE",
  })
  mainTask: MainTaskEntity;

  @ManyToOne(() => SubTaskEntity, (subtask) => subtask.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parentSubtask: SubTaskEntity;

  @OneToMany(() => SubTaskEntity, (subtask) => subtask.parentSubtask)
  children: SubTaskEntity[];
}
