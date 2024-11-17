// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
// } from "typeorm";
// import { AccountEntity } from "./account.entity";
// import { Subtask } from "./subtask.entity";

// @Entity("tasks")
// export class Task {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   description: string;

//   @Column()
//   tag: string;

//   @Column()
//   created_at: Date;

//   @Column()
//   updated_at: Date;

//   @Column({ type: 'bytea' })
//   document: Buffer;

//   @Column({ default: false })
//   isCompleted: boolean;

//   @ManyToOne(() => AccountEntity, (user) => user.tasks, { onDelete: "CASCADE" })
//   user: AccountEntity;

//   @OneToMany(() => Subtask, (subtask) => subtask.task)
//   subtasks: Subtask[];
// }
