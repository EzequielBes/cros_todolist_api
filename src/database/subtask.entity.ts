import { MainTaskEntity } from './main-task.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';


@Entity('subtasks')
export class SubTaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner_task_id:string

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

   @Column()
  tag: string;

  @Column({ type: 'bytea' })
  document: Buffer;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
  

  @ManyToOne(() => MainTaskEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'main_task_id' })
  mainTask: MainTaskEntity | null;


  @ManyToOne(() => SubTaskEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_subtask_id' })
  parentSubTask: SubTaskEntity | null;
}
