import { MainTaskEntity } from "./main-task.entity";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("subtasks")
export class SubTaskEntity {
  @PrimaryColumn()
  id: string;

  // @Column()
  // owner_task_id: string;

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

  @Column({ nullable: true })
  main_task_id: string;

  @Column({ nullable: true })
  parent_sub_task_id: string;

  @ManyToOne(() => MainTaskEntity, (maintask) => maintask.subtasks)
  @JoinColumn({ name: "main_task_id", referencedColumnName: "id" })
  mainTask: MainTaskEntity;

  @ManyToOne(() => SubTaskEntity, (subtask) => subtask.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_sub_task_id", referencedColumnName: "id" })
  parentSubtask: SubTaskEntity;

  @OneToMany(() => SubTaskEntity, (subtask) => subtask.parentSubtask)
  children: SubTaskEntity[];
}
